import './movie-details.styles.scss';

const MovieDetails = ({ isScrolling, movie, clicked }) => {
    return (
        <div  className={`${ isScrolling ? 'isScrolling' : ''} ${clicked ? 'clicked' : ''} item-details-container`}>
            <div style={{
            backgroundImage: `url(${movie.poster})`
            }} className='item-details-image-container'>
                {/* <img src={selectedMovie.imageUrl} alt='' className='item-details-image'/> */}
            </div>
            <p className='item-title'>{movie.name && movie.name}</p>
            <p className='item-genre'>{movie.genre && movie.genre}</p>
            <div className='item-year-container'>
                <p>{movie.releaseInfo && movie.releaseInfo}</p>
            </div>
            {
                movie.director && (
                    <div className='item-director-container'>
                        <p className='item-director'>Director</p>
                        <p>{movie.director}</p>
                    </div>
                )
            }
            {
                movie.actors && (
                    <div className='item-actors-container'>
                        <p className='item-lead-actors'>Lead Actors</p>
                        <p>{movie.actors}</p>
                    </div>
                )
            }
            {
                movie.summary && (
                    <div className='item-summary-container'>
                        <p className='item-summary'>Summary</p>
                        <p>{movie.summary}</p>
                    </div>
                )
            }
                
        </div>
    )
}

export default MovieDetails;