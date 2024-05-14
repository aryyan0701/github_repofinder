import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;