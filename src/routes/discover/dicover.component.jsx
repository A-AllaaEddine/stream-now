import './discover.styles.scss';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

// import MovieDetails from '../../components/movie-details/movie-details.component';
import ItemDetails from '../../components/item-details/items-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectAddonsTypesCatalogs, selectTypeCatalog, selectIsLoading, selectAddonsTypes, selectDefaultTypesCatalogs } from '../../store/catalog/catalog.selectors';
import { fetchTypeCatalogsStart } from '../../store/catalog/catalog.actions.js';
import { type } from '@testing-library/user-event/dist/type';





const Discover = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ selectedType, setSelectedType ] = useState("movie");
    const [ selectedSubType, setSelectedSubType ] = useState("Popular");
    const [ types, setTypes ] = useState([]);
    const [ subTypes, setSubTypes ] = useState([]);
    const [ selectedId, setSelectedId ] = useState("");
    const [ selectedAddonUrl, setSelectedAddonUrl ] = useState("https://v3-cinemeta.strem.io/manifest.json");
    const [ clicked, setClicked ] = useState(false);
    const [ typesToggled, setTypesToggled ] = useState(false);
    const [ subTypesToggled, setSubTypesToggled ] = useState(false);

    const AddonsTypesCatalogs = useSelector(selectAddonsTypesCatalogs);
    const DefaultAddonTypes = useSelector(selectDefaultTypesCatalogs);
    const AddonsTypes = useSelector(selectAddonsTypes);
    const TypeCatalogs = useSelector(selectTypeCatalog);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(AddonsTypesCatalogs);


  
    useEffect(() => {
        var types = []
        for (let type of DefaultAddonTypes) {
            types.push(...type)
        }
        
        const ids = types.map(o => o.type)
        const filtered = types.filter(({type}, index) => !ids.includes(type, index + 1))
        setTypes(filtered);
    }, [AddonsTypes])
    


    useEffect(() => {
        var subtypes = [];
         AddonsTypesCatalogs.map(addon => {
            // console.log(addon);
            const t =  addon[selectedType];
            // console.log(t);
            const addonUrl = addon["addonUrl"];
            {
                if (t) {
                    for (let i = 0; i< t.length; i++) {
                        // console.log(t[i]);
                        subtypes.push({addonUrl: addonUrl, ...t[i]});
                    }
                }}
        })
        const ids = subtypes.map(o => o.id)
        const filtered = subtypes.filter(({id}, index) => !ids.includes(id, index + 1))
        // console.log(subtypes[0]);
        setSubTypes(filtered);
        { filtered[0] && setSelectedSubType(filtered[0].name)}
    }, [selectedType, AddonsTypesCatalogs])


    useEffect(() => {
        setSelectedType("movie");
        setSelectedId("top");
        dispatch(fetchTypeCatalogsStart({selectedAddonUrl, selectedType, selectedId}))
    }, [])
    
    useEffect(() => {
        dispatch(fetchTypeCatalogsStart({selectedAddonUrl, selectedType, selectedId}))
    }, [selectedAddonUrl, selectedType, selectedId])

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setClicked(true);
    }


   

    const selectTypeAndIdAndUrl = (type, id, addonUrl) => {
        switch (type) {
            case "movie":
                setSelectedId("top");
                setSelectedSubType("Popular");
                setSelectedAddonUrl("https://v3-cinemeta.strem.io/manifest.json")
                break;
            case "series":
                setSelectedId("top");
                setSelectedSubType("Popular");
                setSelectedAddonUrl("https://v3-cinemeta.strem.io/manifest.json")
                break;
            default:
                setSelectedId(id)
                setSelectedAddonUrl(addonUrl);
            }
            setSelectedType(type);
        }

        const handleNavigation = () => {
            navigate(`/details/${encodeURIComponent(selectedMovie.addonUrl).replaceAll("%2F","~2F")}/${selectedMovie.type}/${encodeURIComponent(selectedMovie.id).replaceAll("%2F","~2F")}`)
        }

        const toogleTypesDropdown = () => {
            setTypesToggled(!typesToggled);
            setSubTypesToggled(false);
        }
        const toogleSubTypesDropdown = () => {
            setSubTypesToggled(!subTypesToggled);
            setTypesToggled(false);
        }

    

    return (
        <>
            <div className='discover-container'>
                {/* <MovieDetails isScrolling={isScrolling} movie={selectedMovie} clicked={clicked} /> */}
                <div className='types-subtypes-container'>
                    <div className='types-container'>
                        <nav className='types-nav'>
                            <button className='types-button' onClick={toogleTypesDropdown}>{`${selectedType ? `${selectedType}` : "Seelct Type"}`} ▼</button>
                            <div className={`${typesToggled ? "toggled" : ""} types-list`}>
                                {types &&
                                    types.map(type => {
                                        return <li key={type.id} onClick={() => {selectTypeAndIdAndUrl(type.type, type.id, type.addonUrl); toogleTypesDropdown()}} className="type-item">{type.type}</li>
                                    })
                                }
                                
                            </div>
                        </nav>
                    </div>
                    <div className='SubTypes-container'>
                        <nav className='SubTypes-nav'>
                            <button className='SubTypes-button' onClick={toogleSubTypesDropdown}>{`${selectedSubType ? `${selectedSubType}` : "Seelct SubType"}`} ▼</button>
                            <div className={`${subTypesToggled ? "toggled" : ""} SubTypes-list`}>
                                {subTypes &&
                                    subTypes.map(subtype => {
                                        return <li key={subtype.id} onClick={() => {setSelectedId(subtype.id); setSelectedAddonUrl(subtype.addonUrl); setSelectedSubType(subtype.name); toogleSubTypesDropdown()}} className="SubTypes-item">{subtype.name}</li>
                                    })
                                }
                                
                            </div>
                        </nav>
                    </div>
                </div>
                <ItemDetails clicked={clicked} setClicked={setClicked} selectedMovie={selectedMovie} handleNavigation={handleNavigation} />
                {!isLoading && types.length > 0 && subTypes.length > 0 ?
                    (TypeCatalogs.length > 2 ? (
                        <div className='items-container'>
                            {TypeCatalogs &&
                                TypeCatalogs.filter((_, idx) => idx > 2).map((movie) => {
                                    return (
                                        <MovieCard key={movie.id} movie={{addonUrl: TypeCatalogs[2].addonUrl, ...movie}} selectItem={selectItem}/>
                                    )
                                })
                            }
                        </div>) : (
                        <div className='no-items-container'>
                            Addon did not return any item
                        </div>
                    )) : (
                        <div className='items-spinner-container'> 
                            <Spinner />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Discover;