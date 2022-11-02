import './discover.styles.scss';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import MovieDetails from '../../components/movie-details/movie-details.component';
import MovieCard from '../../components/movie-card/movie-card.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCatalogMetas, selectAddonsTypesCatalogs, selectAddosnUrls, selectTypeCatalog } from '../../store/catalog/catalog.selectors';
import { fetchTypeCatalogsStart } from '../../store/catalog/catalog.actions.js';



const Discover = () => {
    const [ selectedMovie, setSelectedMovie ] = useState({});
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ selectedType, setSelectedType ] = useState("movie");
    const [ subTypes, setSubTypes ] = useState([]);
    const [ selectedId, setSelectedId ] = useState("MCmovies");
    const [clicked, setClicked] = useState(false);

    const AddonsTypesCatalogs = useSelector(selectAddonsTypesCatalogs);
    const AddonUrls = useSelector(selectAddosnUrls);
    const TypeCatalogs = useSelector(selectTypeCatalog);
    var catalogMaps;
    if (TypeCatalogs[0]) {
        catalogMaps = TypeCatalogs[0][0];
    }
    // console.log(TypeCatalogs[0][0]);
    const dispatch = useDispatch();
    // console.log(subTypes);

  
    
    const CatalogMetas = useSelector(selectCatalogMetas);


    useEffect(() => {
        var subtypes = [];
         AddonsTypesCatalogs.map(addon => {
            const t =  addon[selectedType];
            {
                if (t) {
                    for (let i = 1; i< t.length; i++) {
                        subtypes.push(t[i]);
                    }
                }}
        })
        // console.log(subtypes);
        setSubTypes(subtypes);
    }, [selectedType, AddonsTypesCatalogs])


    useEffect(() => {
        dispatch(fetchTypeCatalogsStart({AddonUrls, selectedType, selectedId}))
    }, [selectedType, selectedId])

    const selectItem = (movieItem) => {
        setSelectedMovie(movieItem);
        setIsScrolling(false);
        setClicked(true);
    }

    const handleScroll = (event) => {
        // console.log(event.currentTarget.scrollTop);
        if(event.currentTarget.scrollTop <= 180) {
            setIsScrolling(false);
            setClicked(false);
        }
        else {
            setIsScrolling(true);
        }
    };

    const selectType = (type) => {
        setSelectedType(type);
    }

    const selectId = (id) => {
        setSelectedId(id);
    }

    return (
        <div className='discover-container'>
            <MovieDetails isScrolling={isScrolling} movie={selectedMovie} clicked={clicked} />
            <div className='types-subtypes-container'>
                <div className='types-container'>
                    <div className='types'>
                        <Link className='type' onClick={() => {selectType("movie"); setSelectedId("MCmovies")}}>Movies</Link>
                        <Link className='type' onClick={() => {selectType("series"); setSelectedId("MCseries")}}>Series</Link>
                        <Link className='type' onClick={() => {selectType("channels");}}>Channels</Link>
                        <Link className='type' onClick={() => {selectType("tv channels");}}>TV Channels</Link>
                    </div>
                </div>
                <div className='SubTypes-container'>
                    <div className='SubTypes'>
                        {subTypes &&
                            subTypes.map(subtype => {
                                return (
                                    <Link key={subtype.id} className='subtype' onClick={() => selectId(subtype.id)} >{subtype.name}</Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`${isScrolling ? 'isScrolling' : null} ${clicked ? 'clicked': ''} items-container`} onScroll={handleScroll}>
                    {catalogMaps &&
                        catalogMaps.map((movie) => {
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