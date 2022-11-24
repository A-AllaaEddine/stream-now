
import './items-details.styles.scss';

const ItemDetails = ({ selectedMovie, clicked, setClicked, handleNavigation }) => {


    const handleClick = (event) => {
        if(event.target === event.currentTarget) {
            setClicked(!clicked);
        }
    }
    return (
        <div className={`${clicked ? 'clicked': ''} popup-display`} onClick={handleClick}>
            <div style={ clicked ?{
            backgroundImage: `url(${selectedMovie.background || selectedMovie.poster})`
            } : { backgroundImage: 'none'}} className={`${clicked ? 'clicked': ''} display`}>
                <div className='img-background'>
                <img src={selectedMovie.poster}  alt='movie-image' className='poster-img'/>
                <div className='selectedMovie-info'>
                    <p className='selectedMovie-title'>{selectedMovie.title || selectedMovie.name}</p>
                    <div className='selectedMovie-runtime-rating-releaseInfo-container'>
                        {selectedMovie.imdbRating && <p className='selectedMovie-imdbRating'>{selectedMovie.imdbRating}</p>}
                        {selectedMovie.runtime && <p className='selectedMovie-runtime'>{selectedMovie.runtime}</p>}
                        <div className='selectedMovie-genre-container'>{/* <p className='movie-genre'>{movie.genre && movie.genre}</p> */}
                            {selectedMovie.genres &&
                                selectedMovie.genres.map(genre => {
                                    return <p key={genre} className='selectedMovie-genre'>{genre}</p>
                                })
                            }
                        </div>
                        {selectedMovie.releaseInfo && <p className='selectedMovie-releaseInfo'>{selectedMovie.releaseInfo}</p>}
                    </div>
                    {
                        (selectedMovie.summary || selectedMovie.description) && (
                            <div className='selectedMovie-summary-container'>
                                {/* <p className='movie-summary'>Summary</p> */}
                                <p>{selectedMovie.summary || selectedMovie.description}</p>
                            </div>
                        )
                    }
                </div>
                <div className='movie-buttons-container'>
                    <button className='selectedMovie-watch-now' onClick={handleNavigation}>WATCH NOW</button>
                    <button className='selectedMovie-add-to-library-button'>Add to library</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ItemDetails;