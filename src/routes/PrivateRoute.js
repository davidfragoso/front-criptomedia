import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userId = localStorage.getItem('LoggedUser');

  return userId ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
