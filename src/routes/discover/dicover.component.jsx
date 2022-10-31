import './discover.styles.scss';

import { Link } from 'react-router-dom';

import { Movies, Series } from '../../utils/data';
import { useState } from 'react';


const Discover = () => {
    const [ movies, setMovies ] = useState(Movies);
    const [ clicked, setClicked ] = useState(false);

    const toggleOnClick = () => {
    }

    return (
        <div className='discover-container'>
            <div className='types-container'>
                <div className='types'>
                    <Link className={`${clicked ? 'clicked' : 'null'} 'type'`} onClick={toggleOnClick}>Movies</Link>
                    <Link className={`${clicked ? 'clicked' : 'null'} 'type'`} onClick={toggleOnClick}>Series</Link>
                    <Link className={`${clicked ? 'clicked' : 'null'} 'type'`} onClick={toggleOnClick}>Channels</Link>
                    <Link className={`${clicked ? 'clicked' : 'null'} 'type'`} onClick={toggleOnClick}>TV Channels</Link>
                </div>
            </div>
            <div className='items-container'>
                    {
                        movies.map((movie) => {
                            return (
                                <div key={movie.id} className='movie-container'>
                                    <div className='movie-image-container'>
                                        <img src={movie.imageUrl} alt='movie' />
                                    </div>
                                    <div className='movie-name'>
                                        <h3>{movie.name}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default Discover;