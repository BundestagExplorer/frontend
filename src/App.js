import React from 'react';
import './App.css';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Voting from './pages/voting';
import ThemOMeter from './pages/them-o-meter';
import '@fontsource/roboto/400.css';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/votes' element={<Voting />} />
              <Route path='/them-o-meter' element={<ThemOMeter />} />
          </Routes>
      </Router>
  );
}

export default App;