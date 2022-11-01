import './home.styles.scss';

import Client from 'stremio-addon-client';

import { useState } from 'react';


import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCatalogMetas, selectIsLoading, selectMoviesCatalogs, selectSeriesCatalogs } from '../../store/catalog/catalog.selectors';
import { useDispatch } from 'react-redux';
import { fetchCatalogMetasStart } from '../../store/catalog/catalog.actions';




const Home = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);

    const MoviesResource = useSelector(selectMoviesCatalogs);
    const SeriesResource = useSelector(selectSeriesCatalogs);
    const CatalogMetas = useSelector(selectCatalogMetas);
    const MoviesMetas = CatalogMetas[0];
    const SeriesMetas = CatalogMetas[1];
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();
    const url = 'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json';

    const moviesData = {resource: 'catalog', type: 'movie', id: `${MoviesResource[0] && MoviesResource[0].id}`, extra: {}};
    const seriesData = {resource: 'catalog', type: 'series', id: `${SeriesResource[0] && SeriesResource[0].id}`, extra: {}};
    

    useEffect(() => {
        dispatch(fetchCatalogMetasStart({url, moviesData, seriesData}));
    }, [])

    const handleScroll = (event) => {
        // console.log(event.currentTarget.scrollTop);
        if(event.currentTarget.scrollTop <= 230) {
            setIsScrolling(false);
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
    }

    return (
        <>
        {
            !isLoading ? (
                <div className='home-container'>
            <MovieDetails isScrolling={isScrolling}  movie={selectedMovie} />
            <div className={`${isScrolling ? 'isScrolling' : null} items-container`} onScroll={handleScroll}>
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