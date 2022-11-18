import './home.styles.scss';


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectCatalogMetas, selectIsLoading, selectDefaultTypesCatalogs } from '../../store/catalog/catalog.selectors';
import { fetchCatalogMetasStart } from '../../store/catalog/catalog.actions';



// const getPos = (el) => {
//     let Pos = document.getElementById(el.id);
//     let rect = Pos.getBoundingClientRect();
//     let target = document.getElementsByClassName('movie-banner');
//     return {x: rect.x + 'px', y: rect.y + 'px'};
// }


const Home = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    
    const defaultTypesCatalog = useSelector(selectDefaultTypesCatalogs);

    const CatalogMetas = useSelector(selectCatalogMetas);
    const isLoading = useSelector(selectIsLoading);
    // console.log(CatalogMetas);

    const dispatch = useDispatch();

        
        
        
    useEffect(() => {
        dispatch(fetchCatalogMetasStart(defaultTypesCatalog));
    }, [defaultTypesCatalog])

    const handleScroll = (event) => {
        if(event.currentTarget.scrollTop) {
            setIsScrolling(false);
            setClicked(false);
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
        setClicked(true);

        // const itemPos = getPos(movieItem);
        // setItemPos(itemPos);
    }


    
    // const top = ItemPos.y.replace(/ \" /g, '');
    // const left = ItemPos.x.replace(/ \" /g, '');

    const handleNavigation = () => {
        navigate(`/details/${encodeURIComponent(selectedMovie.addonUrl).replaceAll("%2F","~2F")}/${selectedMovie.type}/${encodeURIComponent(selectedMovie.id).replaceAll("%2F","~2F")}`)
    }
    
    return (
        <>
        {
            !isLoading ? (
                <div className='home-container'>
                    <MovieDetails isScrolling={isScrolling}  movie={selectedMovie} clicked={false} />
                    <div  className={`${isScrolling ? 'isScrolling' : ''} ${clicked ? '': ''} items-container`} onScroll={handleScroll}>
                        <div className={`${clicked ? 'clicked': ''} popup-display`} onClick={() =>setClicked(!clicked)}>
                            <div style={{
                            backgroundImage: `url(${selectedMovie.background || selectedMovie.poster})`
                        }} className={`${clicked ? 'clicked': ''} display`}>
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
                                <button className='selectedMovie-watch-now' onClick={handleNavigation}>WATCH NOW</button>
                            </div>
                            </div>
                        </div>
                        {CatalogMetas &&
                            CatalogMetas.map((catalog, index) => {
                                return (
                                    <div key={index} className='addon-items-container'>
                                        {
                                            catalog.map((cat, idx) => {
                                                if(cat.length > 1) {
                                                        return (
                                                            <div key={idx} className='movies-container'>
                                                                <h2>{cat[0].addonName}- {cat[1].type} - Popular</h2>
                                                                <div className='movies-list-container'>
                                                                    {
                                                                        cat.filter((_, idx) => idx > 2 && idx < 20).map((movie) => {
                                                                            return (
                                                                                <MovieCard key={movie.id}  movie={{addonUrl: cat[2].addonUrl, ...movie}} selectItem={selectItem} clicked={clicked} />
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                            })
                                        }
                                    </div>
                                    )
                            })
                        }
                    </div>
                </div>
            ) : (
                <div className='spinner-container'> 
                    <Spinner />
                </div>
            )
        }
        </>
    )
}

export default Home;