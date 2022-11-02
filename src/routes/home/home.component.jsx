import './home.styles.scss';


import { useState, useEffect } from 'react';


import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCatalogMetas, selectIsLoading, selectTypesCatalogs, selectAddosnUrls } from '../../store/catalog/catalog.selectors';
import { fetchCatalogMetasStart } from '../../store/catalog/catalog.actions';




const Home = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [clicked, setClicked] = useState(false);

    
    const typeCatalogs = useSelector(selectTypesCatalogs);
    const AddonUrls = useSelector(selectAddosnUrls);

    const CatalogMetas = useSelector(selectCatalogMetas);
    // const MoviesMetas = CatalogMetas && CatalogMetas[0][0];
    // const SeriesMetas = CatalogMetas && CatalogMetas[0][1];
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
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
        setClicked(true);
    }

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
                                return (
                                    <div key={catalog.id} className='addon-items-container'>
                                        {MoviesMetas &&
                                        <div className='movies-container'>
                                            <h2>Movies - Popular</h2>
                                            <div className='movies-list-container'>
                                                {
                                                    MoviesMetas.filter((_, idx) => idx < 20).map((movie) => {
                                                        return (
                                                            <MovieCard key={movie.id} movie={movie} selectItem={selectItem} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>}
                                        {SeriesMetas &&
                                        <div className='movies-container'>
                                            <h2>Series - Popular</h2>
                                            <div className='movies-list-container'>
                                                {
                                                    SeriesMetas.filter((_, idx) => idx < 20).map((movie) => {
                                                        return (
                                                            <MovieCard key={movie.id} movie={movie} selectItem={selectItem} />
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
                <div className='home-container'> null
                </div>
            )
        }
        </>
    )
}

export default Home;