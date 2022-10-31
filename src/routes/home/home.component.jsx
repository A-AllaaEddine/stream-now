import './home.styles.scss';

import { Movies, Series } from '../../utils/data';
import { useState } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';

const Home = () => {
    const [ movies, setMovies ] = useState(Movies);

    const [ selectedMovie, setSelectedMovie ] = useState(Movies[0]);

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
    }

    return (
        <div className='home-container'>
            <MovieDetails movie={selectedMovie} />
            <div className='items-container'>
                <div className='movies-container'>
                    <h2>Movies - Popular</h2>
                    <div className='movies-list-container'>
                        {
                            movies.map((movie) => {
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
                            movies.map((movie) => {
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
                            movies.map((movie) => {
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