import React from 'react';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import SocialLayout from '../layouts/SocialLayout';
import Profile from '../components/Profile/Profile';
import Chat from '../components/SocialComponents/Chat/Chat';
import Login from '../components/Authentication/Login/Login';
import UserView from '../components/UserProfile/UserView';
import cardsview from '../components/UserProfile/CardsView';

// Rutas para la barra lateral
export const sidebarRoutes = [
  { path: '/', name: 'Feed', icon: <RssFeedIcon /> },
  { path: '/cardsview', name: 'Seguidores', icon: <PeopleIcon /> },
  { path: '/chats', name: 'Chats', icon: <ChatIcon /> },
  { path: '/userprofile', name: 'Vista usuario', icon: <ChatIcon /> },
  { path: '/saved', name: 'Elementos guardados', icon: <BookmarkIcon /> },
  { path: '/settings', name: 'Configuración', icon: <SettingsIcon /> },
];

// Rutas principales
const routes = [
  {
    path: '/',
    element: <SocialLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'userprofile', element: <UserView /> },
      { path: 'chats', element: <Chat /> },
      { path: 'cardsview', element: <cardsview /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
