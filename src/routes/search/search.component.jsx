import './search.styles.scss';

import { useState, useEffect } from 'react';


import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCatalogMetas, selectIsLoading, selectAddonExtraCatalogs } from '../../store/catalog/catalog.selectors';
import { fetchSeachCatalogsStart } from '../../store/catalog/catalog.actions';


const Search = () => {

    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ searchInput, setSearchInput ] = useState(useParams());
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [clicked, setClicked] = useState(false);

    
    const AddonsCatalogs = useSelector(selectAddonExtraCatalogs);
    // console.log(AddonsCatalogs);

    const CatalogMetas = useSelector(selectCatalogMetas);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();
    const { searchParam } = useParams();

        
    
    
    
        
    useEffect(() => {
        setSearchInput(searchParam.toLowerCase())
        if(searchInput.length > 0) {
            dispatch(fetchSeachCatalogsStart({searchInput, AddonsCatalogs}))
        }
    }, [searchInput, AddonsCatalogs])

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
    }

    return (
        <>
        {
            !isLoading ? (
                <div className='search-results-container'>
                    <MovieDetails isScrolling={isScrolling}  movie={selectedMovie} clicked={clicked} />
                    <div  className={`${isScrolling ? 'isScrolling' : ''} ${clicked ? 'clicked': ''} items-container`} onScroll={handleScroll}>
                        {CatalogMetas &&
                            CatalogMetas.map((catalog, index) => {
                                // console.log(catalog);
                                return (
                                    <div key={index} className='addon-items-container'>
                                        {
                                            catalog.map((cat, idx) => {
                                                if(cat.length > 1) {
                                                    return (
                                                        <div key={idx} className='movies-container'>
                                                            <h2>{cat[0] && cat[0].addonName}- {cat[1] && cat[1].type} - Popular</h2>
                                                            <div className='movies-list-container'>
                                                                {
                                                                    cat.filter((_, idx) => idx > 1 && idx < 20).map((movie) => {
                                                                        return (
                                                                            <MovieCard key={movie.id} movie={movie} selectItem={selectItem} clicked={clicked} />
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

export default Search;