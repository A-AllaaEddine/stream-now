import './home.styles.scss';

import { Movies, Series } from '../../utils/data';
import { useState } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import { useEffect } from 'react';





const Home = () => {
    const [ movies, setMovies ] = useState(Movies);

    const [ selectedMovie, setSelectedMovie ] = useState(Movies[0]);
    const [ isScrolling, setIsScrolling ] = useState(false);

    

    const handleScroll = (event) => {
        // console.log('scrolling')
        // console.log(isScrolling);
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
                            movies.filter((_, idx) => idx < 20).map((movie) => {
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
                            movies.filter((_, idx) => idx < 20).map((movie) => {
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
                            movies.filter((_, idx) => idx < 20).map((movie) => {
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