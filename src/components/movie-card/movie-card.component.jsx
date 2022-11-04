import './movie-card.styles.scss';

const MovieCard = ({ movie, selectItem }) => {
    const clicked = true;
    return (
        <div  className='movie-container' onClick={() => selectItem(movie)}>
            <div  className='movie-image-container'>
                <img id={`${movie.id}`} src={movie.poster} alt='movie' />
            </div>
            <div className='movie-name'>
                <h3>{movie.name}</h3>
            </div>
        </div>
    )
}

export default MovieCard;