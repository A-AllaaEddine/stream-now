import "./search.styles.scss";

import { useState, useEffect } from "react";

import ItemDetails from "../../components/item-details/items-details.component";
import MovieCard from "../../components/movie-card/movie-card.component";
import Spinner from "../../components/Spinner/spinner.component";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectCatalogMetas,
  selectIsLoading,
  selectAddonExtraCatalogs,
} from "../../store/catalog/catalog.selectors";
import { fetchSeachCatalogsStart } from "../../store/catalog/catalog.actions";

const Search = () => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchInput, setSearchInput] = useState(useParams());
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const AddonsCatalogs = useSelector(selectAddonExtraCatalogs);

  const CatalogMetas = useSelector(selectCatalogMetas);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const { searchParam } = useParams();

  useEffect(() => {
    setSearchInput(searchParam.toLowerCase());
    if (searchInput.length > 0) {
      dispatch(fetchSeachCatalogsStart({ searchInput, AddonsCatalogs }));
    }
  }, [searchInput, AddonsCatalogs]);

  const selectItem = (movieItem) => {
    setSelectedMovie(movieItem);
    setClicked(true);
  };

  const handleNavigation = () => {
    navigate(
      `/details/${encodeURIComponent(selectedMovie.addonUrl).replaceAll(
        "%2F",
        "~2F"
      )}/${selectedMovie.type}/${encodeURIComponent(
        selectedMovie.id
      ).replaceAll("%2F", "~2F")}`
    );
  };

  return (
    <>
      {!isLoading ? (
        <div className="search-results-container">
          <ItemDetails
            clicked={clicked}
            setClicked={setClicked}
            selectedMovie={selectedMovie}
            handleNavigation={handleNavigation}
          />
          <div className="items-container">
            {CatalogMetas &&
              CatalogMetas.map((catalog, index) => {
                return (
                  <div key={index} className="addon-items-container">
                    {catalog.map((cat, idx) => {
                      return (
                        <>
                          {cat.length > 1 && (
                            <div key={idx} className="movies-container">
                              <h2>
                                {cat[0] && cat[0].addonName}-{" "}
                                {cat[1] && cat[1].type} - Popular
                              </h2>
                              <div className="movies-list-container">
                                {cat
                                  .filter((_, idx) => idx >= 1 && idx < 20)
                                  .map((movie) => {
                                    return (
                                      <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        selectItem={selectItem}
                                        clicked={clicked}
                                      />
                                    );
                                  })}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Search;
