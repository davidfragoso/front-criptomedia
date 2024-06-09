import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLayout from './layouts/SocialLayout';
import Login from './components/Authentication/Login/login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
      </Route>
    </Routes>
  );
};

export default App;
