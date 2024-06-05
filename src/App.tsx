import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLayout from './layouts/SocialLayout';
import './App.css';  // Importa el archivo CSS

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLayout />}>
      </Route>
    </Routes>
  );
};

export default App;
