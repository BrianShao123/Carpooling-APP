import './css/App.css';
import SplashScreen from './components/SplashScreen';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import MapContainer from './components/GoogleMap';
import HomePage from './components/HomePage';
import AppBanner from './components/AppBanner';
import CreateRide from './components/CreateRide';
import RidePage from './components/RidePage';

export const App = () => {
  return (
       //<SplashScreen/>
    //<MapContainer/>
  <BrowserRouter>
          <div className="app">
            <AppBanner/>
            <Routes> 
            <Route exact path="/" element={<SplashScreen />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/create" element={<CreateRide />} />
            <Route exact path="/ride" element={<RidePage />} />
            </Routes>
          </div>
  </BrowserRouter>
    );
}

export default App;
