import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Data } from './components/Data';
import Authentification from './components/Authentification';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/data" element={<Data />} />
     </Routes>
  );
}

export default App;
