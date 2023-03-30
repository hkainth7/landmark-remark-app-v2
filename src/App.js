import React from 'react';
import LandmarkRemark from './components/LandmarkRemark';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MapProvider} from 'react-map-gl';
import Signup from './components/Signup';
import Login from './components/Login';

import './styles/App.css';

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <MapProvider>
            <Routes>
              <Route exact path = "/" Component={Login} />
              <Route path="/signup" Component={Signup} />
              <Route path="/landmarkRemark" Component={LandmarkRemark} />
            </Routes>
          </MapProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
