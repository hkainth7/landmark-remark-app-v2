import React from 'react';
import LandmarkRemark from './components/LandmarkRemark';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import styled from 'styled-components';
import './styles/App.scss';

const Container = styled.div`
  width: 100%;
`;

function App() {

  return (
    <Container>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path = "/" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/landmarkRemark" Component={LandmarkRemark} />
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
