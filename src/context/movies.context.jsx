import { useState } from 'react';
import { createContext } from 'react';
import { Movies } from '../utils/data';



export const MoviesContext = createContext({
    movies: [],
    setMovies: () => {}
})


export const MoviesProvider =  ({ children }) => {
    const [ movies, setMovies ] = useState(Movies)

    const value = {
        movies
    }


    return (
        <MoviesContext.Provider value={value} >
            { children }
        </MoviesContext.Provider>
    )
}