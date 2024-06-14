import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLayout from './layouts/SocialLayout';
import Profile from './components/Profile/Profile';

import './App.css'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLayout />}></Route>
      <Route path='/profile' element={<Profile />}></Route>

    </Routes>
  );
};

export default App;
