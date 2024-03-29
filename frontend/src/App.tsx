import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import CPM from './components/cpm/CPM';
import Middleman from './components/middleman/Middleman';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cpm" element={<CPM />} />
        <Route path="/middleman" element={<Middleman />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;