import React from 'react';
import SocialLayout from '../layouts/SocialLayout';
import Profile from '../components/Profile/Profile';

const routes = [
  {
    path: '/',
    element: <SocialLayout />
  },
  {
    path: '/profile',
    element: <Profile />
  }
];

export default routes;
