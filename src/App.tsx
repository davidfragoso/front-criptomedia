import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLayout from './layouts/SocialLayout';
import './App.css'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLayout />}>
      </Route>
    </Routes>
  );
};

export default App;
