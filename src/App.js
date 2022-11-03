import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Discover from './routes/discover/dicover.component';
import MovieMeta from './routes/movie-meta/movie-meta.component';

import { fetchAddonDataStart } from './store/catalog/catalog.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectAddosnUrls } from './store/catalog/catalog.selectors';

import './App.scss';

const App = () => {
  const AddonsUrls = useSelector(selectAddosnUrls);
  const dispatch = useDispatch();
  const url = 'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json';

  useEffect(() => {
    dispatch(fetchAddonDataStart(AddonsUrls));
}, []);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='discover' element={<Discover />} />
          <Route path='description' element={<MovieMeta />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
