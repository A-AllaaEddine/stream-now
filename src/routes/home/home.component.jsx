import './home.styles.scss';


import { useState, useEffect } from 'react';


import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectCatalogMetas, selectIsLoading, selectDefaultTypesCatalogs, selectAddosnUrls } from '../../store/catalog/catalog.selectors';
import { fetchCatalogMetasStart } from '../../store/catalog/catalog.actions';



const getPos = (el) => {
    let Pos = document.getElementById(el.id);
    let rect = Pos.getBoundingClientRect();
    let target = document.getElementsByClassName('movie-banner');
    return {x: rect.x + 'px', y: rect.y + 'px'};
}


const Home = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [ItemPos, setItemPos] = useState({x: "0px", y: "0px"});

    
    const typeCatalogs = useSelector(selectDefaultTypesCatalogs);
    const AddonUrls = useSelector(selectAddosnUrls);

    const CatalogMetas = useSelector(selectCatalogMetas);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();
    // console.log(CatalogMetas);

        
        
        
    useEffect(() => {
        dispatch(fetchCatalogMetasStart({AddonUrls, typeCatalogs}));
    }, [typeCatalogs])

    const handleScroll = (event) => {
        // console.log(event.currentTarget.scrollTop);
        if(event.currentTarget.scrollTop <= 230) {
            setIsScrolling(false);
            setClicked(false);
            setSelectedMovie({});
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
        setClicked(true);

        const itemPos = getPos(movieItem);
        console.log(itemPos);
        setItemPos(itemPos);
    }

    const top = ItemPos.y.replace(/ \" /g, '');
    const left = ItemPos.x.replace(/ \" /g, '');
    console.log(top)
    console.log(left)
    
    return (
        <>
        {
            !isLoading ? (
                <div className='home-container'>
                    <MovieDetails isScrolling={isScrolling}  movie={selectedMovie} clicked={clicked} />
                    <div  className={`${isScrolling ? 'isScrolling' : ''} ${clicked ? 'clicked': ''} items-container`} onScroll={handleScroll}>
                        {CatalogMetas &&
                            CatalogMetas.map(catalog => {
                                const MoviesMetas = catalog[0];
                                const SeriesMetas = catalog[1];
                                // console.log(MoviesMetas);
                                return (
                                    <div key={catalog.id} className='addon-items-container'>
                                        {MoviesMetas &&
                                        <div className='movies-container'>
                                            <h2>{MoviesMetas[0].addonName} - Popular</h2>
                                            <div className='movies-list-container'>
                                                {
                                                    MoviesMetas.filter((_, idx) => idx > 0 && idx < 20).map((movie) => {
                                                        return (
                                                            <MovieCard key={movie.id} movie={movie} selectItem={selectItem} clicked={clicked} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        }
                                        {SeriesMetas &&
                                        <div className='movies-container'>
                                            <h2>{SeriesMetas[0].addonName} - Popular</h2>
                                            <div className='movies-list-container'>
                                                {
                                                    SeriesMetas.filter((_, idx) => idx > 0 && idx < 20).map((movie) => {
                                                        return (
                                                            <MovieCard key={movie.id} movie={movie} selectItem={selectItem} clicked={clicked} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ) : (
                <div className='spinner-container'> 
                    <Spinner />
                </div>
            )
        }
        </>
    )
}

export default Home;