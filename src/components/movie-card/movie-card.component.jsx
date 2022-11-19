import './movie-card.styles.scss';


import { memo } from 'react';

const MovieCard = memo(({ movie, selectItem }) => {
    return (
        <div  className='movie-card-container' onClick={() => selectItem(movie)}>
            <div  className='movie-image-container'>
                <img id={`${movie.id}`} src={movie.poster} alt='movie' />
            </div>
            <div className='movie-name'>
                <h3>{movie.name || movie.title}</h3>
            </div>
        </div>
    )
})

export default MovieCard;