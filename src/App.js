import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Discover from './routes/discover/dicover.component';

import './App.scss';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='discover' element={<Discover />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
