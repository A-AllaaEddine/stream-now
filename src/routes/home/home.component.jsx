import "./home.styles.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ItemDetails from "../../components/item-details/items-details.component";
import AddonCatalog from "../../components/addon-catalogs/addon-catalogs.component";
import Spinner from "../../components/Spinner/spinner.component";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCatalogMetas,
  selectIsLoading,
  selectDefaultTypesCatalogs,
  selectAddonsData,
} from "../../store/catalog/catalog.selectors";
import { fetchCatalogMetasStart } from "../../store/catalog/catalog.actions";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const defaultTypesCatalog = useSelector(selectDefaultTypesCatalogs);
  const AddonsData = useSelector(selectAddonsData);

  const CatalogMetas = useSelector(selectCatalogMetas);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogMetasStart({ defaultTypesCatalog, AddonsData }));
  }, [defaultTypesCatalog]);

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
        <div className="home-container">
          <div className="items-container">
            <ItemDetails
              clicked={clicked}
              setClicked={setClicked}
              selectedMovie={selectedMovie}
              handleNavigation={handleNavigation}
            />
            {CatalogMetas &&
              CatalogMetas.map((catalog, index) => {
                console.log(catalog);
                return (
                  <AddonCatalog
                    key={index}
                    catalog={catalog}
                    selectItem={selectItem}
                  />
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

export default Home;
