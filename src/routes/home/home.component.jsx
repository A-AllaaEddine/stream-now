import './home.styles.scss';


import { useState } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MoviesContext } from '../../context/movies.context';





const Home = () => {
    const [ localMovies, setLocalMovies ] = useState([]);
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);

    const { movies } = useContext(MoviesContext)

    useEffect(() => {
        setLocalMovies(movies);
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
        <div className='home-container'>
            <MovieDetails isScrolling={isScrolling}  movie={selectedMovie} />
            <div className={`${isScrolling ? 'isScrolling' : null} items-container`} onScroll={handleScroll}>
                <div className='movies-container'>
                    <h2>Movies - Popular</h2>
                    <div className='movies-list-container'>
                        {
                            localMovies.filter((_, idx) => idx < 20).map((movie) => {
                                return (
                                    <MovieCard key={movie.id} movie={movie} selectItem={selectItem} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='movies-container'>
                    <h2>Series - Popular</h2>
                    <div className='movies-list-container'>
                        {
                            localMovies.filter((_, idx) => idx < 20).map((movie) => {
                                return (
                                    <MovieCard key={movie.id} movie={movie} selectItem={selectItem} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='movies-container'>
                    <h2>Series - Popular</h2>
                    <div className='movies-list-container'>
                        {
                            localMovies.filter((_, idx) => idx < 20).map((movie) => {
                                return (
                                    <MovieCard key={movie.id} movie={movie} selectItem={selectItem} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;