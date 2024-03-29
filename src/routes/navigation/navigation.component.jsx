import "./navigation.styles.scss";

import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Extention } from "../../assets/Extension.svg";
import { ReactComponent as Account } from "../../assets/Account.svg";
import { ReactComponent as Search } from "../../assets/Search.svg";
import Feed from "../../assets/Feed.png";
import Discover from "../../assets/Discover.png";
import Library from "../../assets/Library.png";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchInput.length > 0) {
      setSearchInput("");
      navigate(`/search=${searchInput.replace(/\s/g, "-").toLowerCase()}`);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchInput(value);
  };

  return (
    <>
      <div className="navigation-container">
        <div className="routes-container">
          <Link to="/" className="route" aria-label="Go to board">
            <img src={Feed} alt="" className="feed-icon" />
          </Link>
          <Link to="/discover" className="route" aria-label="Go to discover">
            <img src={Discover} alt="" className="discover-icon" />
          </Link>
          <Link to="/my-library" className="route" aria-label="Go to library">
            <img src={Library} alt="" className="library-icon" />
          </Link>
        </div>
        <div className="search-container">
          <form
            style={
              location.pathname === "/" ||
              location.pathname.includes("/discover") ||
              location.pathname.includes("/my-library") ||
              location.pathname.includes("/account") ||
              location.pathname.includes("/search")
                ? { backgroundColor: "#0e2c4b", border: "1px solid #0E2C4B" }
                : { display: "none" }
            }
            className="search-input-container"
            onSubmit={handleSubmit}
          >
            <input
              name="search"
              type="text"
              value={searchInput}
              placeholder="Search"
              onChange={handleChange}
            />
            <button className="search-button" role="search">
              <Search type="submit" className="search-icon" />
            </button>
          </form>
        </div>
        <div className="menu-container">
          <Link to="/addons" className="route" aria-label="Go to addons">
            <Extention className="extention-icon" />
          </Link>
          <Link to="/account" className="route" aria-label="Go to account">
            <Account className="setting-icon" />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
