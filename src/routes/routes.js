import React from 'react';
import SocialLayout from '../layouts/SocialLayout';
import Profile from '../components/Profile/Profile';
import Chat from '../components/SocialComponents/Chat/Chat';

const routes = [
  {
    path: '/',
    element: <SocialLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'chats', element: <Chat /> },
    ],
  },
];

export default routes;
