import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import CPM from '../components/cpm/CPM';
import Middleman from '../components/middleman/Middleman';
import CPMTable from '../components/cpm/CPMTable';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cpm" element={<CPM />} />
      <Route path="/middleman" element={<Middleman />} />
      <Route path="/cpm-table" element={<CPMTable />} />
    </Routes>
  );
}

export default Routing;