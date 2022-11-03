import './movie-details.styles.scss';

import { useNavigate } from 'react-router-dom';

const MovieDetails = ({ isScrolling, movie, clicked }) => {
    const navigate = useNavigate();
    return (
        <div style={{
            backgroundImage: `url(${movie.poster})`
            }} className={`${ isScrolling ? 'isScrolling' : ''} ${clicked ? 'clicked' : ''} item-details-container`}>
            {/* <div  className='item-details-image-container'> */}
                {/* <img src={selectedMovie.imageUrl} alt='' className='item-details-image'/> */}
            {/* </div> */}
            <div className='movie-info'>
                <p className='item-title'>{movie.name && movie.name}</p>
                <div className='item-year-time-genre-container'>
                    <p className='item-time'>2h</p>
                    <p className='item-genre'>{movie.genre && movie.genre}</p>
                    <p className='item-releaseInfo'>{movie.releaseInfo && movie.releaseInfo}</p>
                </div>
                {/* {
                    movie.director && (
                        <div className='item-director-container'>
                            <p className='item-director'>Director</p>
                            <p>{movie.director}</p>
                        </div>
                    )
                } */}
                {/* {
                    movie.actors && (
                        <div className='item-actors-container'>
                            <p className='item-lead-actors'>Lead Actors</p>
                            <p>{movie.actors}</p>
                        </div>
                    )
                } */}
                {
                    movie.summary && (
                        <div className='item-summary-container'>
                            <p className='item-summary'>Summary</p>
                            <p>{movie.summary}</p>
                        </div>
                    )
                }
            </div>
            <button className='watch-now' onClick={() => navigate('/description')}>WATCH NOW</button>
        </div>
    )
}

export default MovieDetails;