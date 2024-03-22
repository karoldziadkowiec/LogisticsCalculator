import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './components/Home';
import CPM from './components/CPM';
import Mediator from './components/Mediator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cpm" element={<CPM />} />
        <Route path="/mediator" element={<Mediator />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;