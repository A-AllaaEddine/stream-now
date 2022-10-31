import './discover.styles.scss';

import { Link } from 'react-router-dom';

import { Movies, Series } from '../../utils/data';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MoviesContext } from '../../context/movies.context';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';



const Categories = [
     {
        id: 0,
        name: 'Movies',
     },{
        id: 0,
        name: 'Series',
     },{
        id: 0,
        name: 'Channels',
     },{
        id: 0,
        name: 'TV Channels',
     }
]

const Discover = () => {
    const [ localMovies, setLocalMovies ] = useState([]);
    const [ clicked, setClicked ] = useState(false);
    const [ selectedMovie, setSelectedMovie ] = useState(Movies[0]);
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ resources, setResources ] = useState([]);
    const [ catalogs, setCatalogs ] = useState([]);

    const { movies } = useContext(MoviesContext)



    useEffect(() => {
        setLocalMovies(movies);
    }, [])

    console.log(resources, catalogs);

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
    }

    const handleScroll = (event) => {
        // console.log(event.currentTarget.scrollTop);
        if(event.currentTarget.scrollTop <= 180) {
            setIsScrolling(false);
        }
        else {
            setIsScrolling(true);
        }
    };

    const toggleOnClick = () => {
    }

    return (
        <div className='discover-container'>
            <MovieDetails isScrolling={isScrolling} movie={selectedMovie}/>
            <div className='types-subtypes-container'>
                <div className='types-container'>
                    <div className='types'>
                        <Link className={`${clicked ? 'clicked' : 'null'} type`} onClick={toggleOnClick}>Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} type`} onClick={toggleOnClick}>Series</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} type`} onClick={toggleOnClick}>Channels</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} type`} onClick={toggleOnClick}>TV Channels</Link>
                    </div>
                </div>
                <div className='SubTypes-container'>
                    <div className='SubTypes'>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Series</Link>
                        <Link className={`${clicked ? 'clicked' : 'null'} subtype`} onClick={toggleOnClick}>MyCimma Movies</Link>
                    </div>
                </div>
            </div>
            <div className={`${isScrolling ? 'isScrolling' : null} items-container`} onScroll={handleScroll}>
                    {
                        localMovies.map((movie) => {
                            return (
                                <MovieCard key={movie.id}  movie={movie} selectItem={selectItem}/>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default Discover;