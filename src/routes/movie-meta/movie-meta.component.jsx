import './movie-meta.styles.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchMovieMetaStart, fetchMovieStreamsStart } from '../../store/catalog/catalog.actions';
import { selectMovieMetas, selectMovieStreams, selectIsMetaLoading, selectAddonsData } from '../../store/catalog/catalog.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/spinner.component';
import EpisodeCard from '../../components/episode-card/episode-card.component';



const MovieMeta = () => {

    const [ seasons, setSeasons ] = useState([]);
    const [ seasonEpisodes, setSeasonEpisodes ] = useState([]);
    const [ selectedSeason, setSelectedSeason ] = useState(0);
    const [ selectedEpisode, setSelectedEpisode ] = useState({});

    const { addonUrl, type, id } = useParams();
    var decodedID = decodeURIComponent(id.replaceAll("~","%"));
    var AddonUrl = decodeURIComponent(addonUrl.replaceAll("~","%"));
    var MovieMetas = useSelector(selectMovieMetas);
    var MovieStreams = useSelector(selectMovieStreams);
    // console.log(MovieMetas);
    const AddonsData = useSelector(selectAddonsData);
    const isLoading = useSelector(selectIsMetaLoading);
    const dispatch = useDispatch();
    const  movie = MovieMetas[1];
    // var streams = MovieStreams[1];
    // console.log(movie);
    const navigate = useNavigate();
    
    
    
    useEffect(() => {
        dispatch(fetchMovieMetaStart({AddonUrl, AddonsData, type, decodedID}));
    }, []);
    
    useEffect(() => {
        if(movie && movie.type === "movie" && MovieMetas.length > 0) {
            dispatch(fetchMovieStreamsStart({AddonUrl, AddonsData, type, decodedID}));
        }
    }, [movie])

    useEffect(() => {
        // console.log(seasonEpisodes);
        if (movie && movie.videos && movie.videos.length > 0) {
            var seasons = [];
            // var seasonEpisodes = [];
            movie.videos.map(video => {
                if(!seasons.includes(video.season)) {
                    seasons.push(video.season)
                }
            })
            setSeasons(seasons);

            const seasonEpisoDes = Object.values(movie.videos.reduce((acc, item) => {
                // Append the item to the array for each season
                acc[`${item.season}`] = [...(acc[item.season] || []), item];
                return acc;
            }, {}))

            setSeasonEpisodes(seasonEpisoDes);


            // console.log(seasonEpisoDes);
            // console.log(seasons);
        }
    }, [movie])

    useEffect(() => {
        if(Object.keys(selectedEpisode).length > 0) {
            decodedID = decodeURIComponent(selectedEpisode.id.replaceAll("~","%"));
            dispatch(fetchMovieStreamsStart({addonUrl, type, decodedID}));
        }
    }, [selectedEpisode])

    const selectSeason = (season) => {
        setSelectedSeason(season);
    }
    
    const selectEpisode = (episode) => {
        // streams = [];
        setSelectedEpisode(episode);
    }

    const selectStream = (stream) => {
        var encodedStreamUrl = encodeURIComponent(stream.url).replaceAll("%2F","~2F");
        // console.log(encodedStreamUrl);
        navigate(`/player/${encodedStreamUrl}`)
    }

    return (
        <>
               
            {!isLoading ? ( 
                movie ?(
                    <div style={{
                        backgroundImage: `url(${movie.background || movie.poster})`
                        }} className='movie-details-container'>
                        <div  className='movie-details-image-container'>
                        </div>
                        {/* <div className='blur-container'></div> */}
                        <div className='movie-container'>
                            <div className='movie-details-info'>
                                <p className='movie-title'>{movie.name && movie.name}</p>
                                <div className='movie-buttons-container'>
                                    {movie.trailers && movie.trailers.length > 0 &&
                                        <button className='watch-trailer-button'>Watch Trailer</button>
                                    }
                                    <button className='add-to-library-button'>Add to library</button>
                                </div>
                                <div className='runtime-rating-releaseInfo-container'>
                                    {movie.runtime && <p className='movie-runtime'>{movie.runtime}</p>}
                                    {movie.releaseInfo && <p className='movie-releaseInfo'>{movie.releaseInfo}</p>}
                                    {movie.imdbRating && <p className='movie-imdbRating'>{movie.imdbRating}</p>}
                                </div>
                                <div className='movie-genre-container'>
                                    {/* <p className='movie-genre'>{movie.genre && movie.genre}</p> */}
                                    {movie.genres &&
                                        movie.genres.map(genre => {
                                            return <p key={genre} className='movie-genre'>{genre}</p>
                                        })
                                    }
                                </div>
                                {
                                    movie.director && movie.director.length > 0 && (
                                        <div className='movie-director-container'>
                                            <p className='movie-director'>Director</p>
                                            <p>{movie.director}</p>
                                        </div>
                                    )
                                } 
                                {
                                    movie.country && (
                                        <div className='movie-country-container'>
                                            <p className='movie-country'>Coutnry</p>
                                            <p>{movie.country}</p>
                                        </div>
                                    )
                                }
                                {
                                    (movie.cast) && (
                                        <div className='movie-actors-container'>
                                            <p className='movie-lead-actors'>Lead Actors</p>
                                            <div className='movie-actors'>
                                                {movie.cast && movie.cast.map((actor) => {
                                                    return <p key={actor}>{actor}</p>
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    (movie.summary || movie.description) && (
                                        <div className='movie-summary-container'>
                                            <p className='movie-summary'>Summary</p>
                                            <p>{movie.summary || movie.description}</p>
                                        </div>
                                    )
                                }
                            {/* <button className='watch-now' >WATCH NOW</button> */}
                            </div>
                            {movie.type === "series" ?(
                                <div className='season-container'>
                                {/* <p className='season-drop'> Season 1</p> */}
                                    <div className='season-drop'>
                                        {
                                            seasons.map(season => {
                                                return <p key={season} onClick={() => selectSeason(season)}>{season}</p>
                                            })
                                        }
                                        
                                    </div>
                                    {seasonEpisodes.length > 0 &&
                                        <div className='episode-container'>
                                        {seasonEpisodes[selectedSeason - 1] ? (
                                            seasonEpisodes[selectedSeason - 1].map(seasonEp => {
                                                return (
                                                    <EpisodeCard key={seasonEp.id} seasonEp={seasonEp} selectEpisode={selectEpisode} />
                                                )
                                            })) : (
                                                seasonEpisodes[selectedSeason].map(seasonEp => {
                                                    return (
                                                        <EpisodeCard key={seasonEp.id} seasonEp={seasonEp} selectEpisode={selectEpisode} />
                                                    )
                                                })
                                            )
                                        }
                                        </div>
                                    }
                                </div>) : null
                                }
                        </div>
                        {MovieStreams.length > 0 ?  (
                            <div className='movie-streams-container'>
                                {
                                    MovieStreams.map((stream, index) => {
                                        if(stream[2]) {
                                            return (
                                                <div key={index} className='addon-stream-container'>
                                                    <h3>{stream[1].addonName}</h3>
                                                    <div className='streams-container'>
                                                        {stream[2] && 
                                                            stream[2].map((str, idx) => {
                                                                return  <p key={idx} className='movie-stream' onClick={() => selectStream(str)}>{str.name}</p>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>) : (
                            <div className='movie-streams-container'>
                                <h2>No Stream Found</h2>
                            </div>
                            )
                        }
                    </div>) : (
                    <div className='movie-no-details-container'>
                        Addon did not return any meta

                    </div>
                    )
                ) : (
                    <div className='spinner-container'>
                        <Spinner />
                    </div>
                )
            }
         </>
    )
}

export default MovieMeta;