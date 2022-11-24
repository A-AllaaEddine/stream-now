import './App.scss';

import { Route, Routes } from 'react-router-dom';

// import Navigation from './routes/navigation/navigation.component';
// import Home from './routes/home/home.component';
// import Discover from './routes/discover/dicover.component';
// import MovieMeta from './routes/movie-meta/movie-meta.component';
// import Search from './routes/search/search.component';
// import PageNotFound from './routes/page-not-found/page-not-found.component';
// import MediaPlayer from './routes/media-player/media-player.component';

import { fetchAddonDataStart } from './store/catalog/catalog.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense  } from 'react';
import { selectAddosnUrls } from './store/catalog/catalog.selectors';

const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Discover = lazy(() => import('./routes/discover/dicover.component'));
const MovieMeta = lazy(() => import('./routes/movie-meta/movie-meta.component'));
const Search = lazy(() => import('./routes/search/search.component'));
const PageNotFound = lazy(() => import('./routes/page-not-found/page-not-found.component'));
const MediaPlayer = lazy(() => import('./routes/media-player/media-player.component'));
const AddonsPage = lazy(() => import('./routes/addons/addons.component'));




const App = () => {
  const AddonsUrls = useSelector(selectAddosnUrls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddonDataStart(AddonsUrls));
}, [AddonsUrls]);
  return (
      <div className='App'>
        <Suspense>
          <Routes>
            <Route path='/' element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path='discover' element={<Discover />} />
              <Route path='details/:addonUrl/:type/:id' element={<MovieMeta />} />
              <Route path='search=:searchParam' element={<Search />} />
              <Route path='player/:streamUrl' element={<MediaPlayer />} />
              <Route path='addons' element={<AddonsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
  );
}

export default App;
