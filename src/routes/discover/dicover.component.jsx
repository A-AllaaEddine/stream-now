import './discover.styles.scss';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectAddonsTypesCatalogs, selectTypeCatalog, selectIsLoading, selectAddonsTypes, selectDefaultTypesCatalogs } from '../../store/catalog/catalog.selectors';
import { fetchTypeCatalogsStart } from '../../store/catalog/catalog.actions.js';



const Types = []


const Discover = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ selectedType, setSelectedType ] = useState("movie");
    const [ selectedSubType, setSelectedSubType ] = useState("Mycima All Movies");
    const [ subTypes, setSubTypes ] = useState([]);
    const [ selectedId, setSelectedId ] = useState("MCmovies");
    const [ selectedAddonUrl, setSelectedAddonUrl ] = useState("https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json");
    const [ clicked, setClicked ] = useState(false);
    const [ types, setTypes ] = useState(false);

    const AddonsTypesCatalogs = useSelector(selectAddonsTypesCatalogs);
    const DefaultAddonTypes = useSelector(selectDefaultTypesCatalogs);
    const AddonsTypes = useSelector(selectAddonsTypes);
    const TypeCatalogs = useSelector(selectTypeCatalog);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    // console.log(DefaultAddonTypes);

  
    useEffect(() => {
        // console.log(AddonsTypes);
        var types = []
        for (let type of DefaultAddonTypes) {
            types.push(...type)
        }
        
        const ids = types.map(o => o.type)
        const filtered = types.filter(({type}, index) => !ids.includes(type, index + 1))
        console.log(filtered);
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
        dispatch(fetchTypeCatalogsStart({selectedAddonUrl, selectedType, selectedId}))
    }, [selectedAddonUrl, selectedType, selectedId])

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
        setClicked(true);
    }

    const handleScroll = (event) => {
        // console.log(event.currentTarget.scrollTop);
        if(event.currentTarget.scrollTop <= 180) {
            setIsScrolling(false);
            setClicked(false);
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectTypeAndIdAndUrl = (type, id, addonUrl) => {
        switch (type) {
            case "movie":
                setSelectedId("MCmovies");
                setSelectedAddonUrl("https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json")
                break;
            case "series":
                setSelectedId("MCseries");
                setSelectedAddonUrl("https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json")
                break;
            default:
                setSelectedId(id)
                setSelectedAddonUrl(addonUrl);
            }
            setSelectedType(type);
        }

    const selectId = (id) => {
        setSelectedId(id);
    }

    return (
        <>
            {
                !isLoading ? (
                    <div className='discover-container'>
                        <MovieDetails isScrolling={isScrolling} movie={selectedMovie} clicked={clicked} />
                        <div className='types-subtypes-container'>
                            <div className='types-container'>
                                <div className='types'>
                                    {types &&
                                        types.map(type =>  {
                                            // console.log(type);
                                            return <Link key={type.id} className={`${selectedType === type.type ? 'checked' : ''} type`} onClick={() => {selectTypeAndIdAndUrl(type.type, type.id, type.addonUrl)}}>{type.type}</Link>
                                        })
                                    }
                                    {/* <Link className={`${selectedType === "movie" ? 'checked' : ''} type`} onClick={() => {selectType("movie"); setSelectedId("MCmovies")}}>Movies</Link>
                                    <Link className={`${selectedType === "series" ? 'checked' : ''} type`} onClick={() => {selectType("series"); setSelectedId("MCseries")}}>Series</Link>
                                    <Link className={`${selectedType === "channels" ? 'checked' : ''} type`} onClick={() => {selectType("channels");}}>Channels</Link>
                                    <Link className={`${selectedType === "tv channels" ? 'checked' : ''} type`} onClick={() => {selectType("tv channels");}}>TV Channels</Link> */}
                                </div>
                            </div>
                            <div className='SubTypes-container'>
                                <div className='SubTypes'>
                                    {subTypes &&
                                        subTypes.map(subtype => {
                                            return (
                                                <Link key={subtype.id} className={`${selectedSubType === subtype.name ? 'checked' : ''} subtype`} onClick={() => {selectId(subtype.id); setSelectedAddonUrl(subtype.addonUrl); setSelectedSubType(subtype.name);}} >{subtype.name}</Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {!isLoading ?
                            (<div className={`${isScrolling ? 'isScrolling' : null} ${clicked ? 'clicked': ''} items-container`} onScroll={handleScroll}>
                                    {TypeCatalogs &&
                                        TypeCatalogs.map((movie) => {
                                            return (
                                                <MovieCard key={movie.id}  movie={movie} selectItem={selectItem}/>
                                            )
                                        })
                                    }
                            </div>) : (
                                <div className='items-container'> 
                                    <Spinner />
                                </div>
                            )
                        }
                    </div>
                ): (
                    <div className='spinner-container'> 
                        <Spinner />
                    </div>
                )
            }
        </>
    )
}

export default Discover;