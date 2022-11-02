import './discover.styles.scss';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectAddonsTypesCatalogs, selectTypeCatalog, selectIsLoading } from '../../store/catalog/catalog.selectors';
import { fetchTypeCatalogsStart } from '../../store/catalog/catalog.actions.js';



const Discover = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ selectedType, setSelectedType ] = useState("movie");
    const [ subTypes, setSubTypes ] = useState([]);
    const [ selectedId, setSelectedId ] = useState("MCmovies");
    const [ selectedAddonUrl, setSelectedAddonUrl ] = useState("https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json");
    const [ clicked, setClicked ] = useState(false);

    const AddonsTypesCatalogs = useSelector(selectAddonsTypesCatalogs);
    const TypeCatalogs = useSelector(selectTypeCatalog);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    // console.log(subTypes);

  
    


    useEffect(() => {
        var subtypes = [];
         AddonsTypesCatalogs.map(addon => {
            const t =  addon[selectedType];
            const addonUrl = addon["addonUrl"];
            {
                if (t) {
                    for (let i = 1; i< t.length; i++) {
                        subtypes.push({addonUrl: addonUrl, ...t[i]});
                    }
                }}
        })
        // console.log(subtypes);
        setSubTypes(subtypes);
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

    const selectType = (type) => {
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
                                    <Link className='type' onClick={() => {selectType("movie"); setSelectedId("MCmovies")}}>Movies</Link>
                                    <Link className='type' onClick={() => {selectType("series"); setSelectedId("MCseries")}}>Series</Link>
                                    <Link className='type' onClick={() => {selectType("channels");}}>Channels</Link>
                                    <Link className='type' onClick={() => {selectType("tv channels");}}>TV Channels</Link>
                                </div>
                            </div>
                            <div className='SubTypes-container'>
                                <div className='SubTypes'>
                                    {subTypes &&
                                        subTypes.map(subtype => {
                                            return (
                                                <Link key={subtype.id} className='subtype' onClick={() => {selectId(subtype.id); setSelectedAddonUrl(subtype.addonUrl)}} >{subtype.name}</Link>
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