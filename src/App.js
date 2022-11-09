import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Discover from './routes/discover/dicover.component';
import MovieMeta from './routes/movie-meta/movie-meta.component';
import Search from './routes/search/search.component';
import PageNotFound from './routes/page-not-found/page-not-found.component';
import MediaPlayer from './routes/media-player/media-player.component';

import { fetchAddonDataStart } from './store/catalog/catalog.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Suspense } from 'react';
import { selectAddosnUrls } from './store/catalog/catalog.selectors';

import './App.scss';

const App = () => {
  const AddonsUrls = useSelector(selectAddosnUrls);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAddonDataStart(AddonsUrls));
    if (!((location.pathname === "/discover") || location.pathname == "/" || (location.pathname === "/description") || (location.pathname === "/search=:searchParam") || (location.pathname === "/player/:streamUrl"))) {
      navigate("/page-not-found");
    }
}, []);
  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='discover' element={<Discover />} />
            <Route path='details/:addonUrl/:type/:id' element={<MovieMeta />} />
            <Route path='search=:searchParam' element={<Search />} />
            <Route path='player/:streamUrl' element={<MediaPlayer />} />
            <Route path='page-not-found' element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
