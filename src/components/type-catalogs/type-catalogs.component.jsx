

import { memo } from "react";

import MovieCard from "../movie-card/movie-card.component";

const TypeCatalogs = memo(({ cat, selectItem }) => {
    return (
        <div  className='movies-container'>
            <h2>{cat[0].addonName}- {cat[1].type} - Popular</h2>
            <div className='movies-list-container'>
                {
                    cat.filter((_, idx) => idx > 2 && idx < 20).map((movie) => {
                        return (
                            <MovieCard key={movie.id}  movie={{addonUrl: cat[2].addonUrl, ...movie}} selectItem={selectItem}/>
                        )
                    })
                }
            </div>
        </div>
    )
});

export default TypeCatalogs;