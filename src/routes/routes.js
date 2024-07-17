import React from 'react';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';


import SocialLayout from '../layouts/SocialLayout';
import Profile from '../components/Profile/Profile';
import Chat from '../components/SocialComponents/Chat/Chat';
import Login from '../components/Authentication/Login/Login';
import Configuration from '../components/SocialComponents/Configuration/configuration';
import SavedPosts from '../components/SocialComponents/SavedPost/savedpost';
import UserView from '../components/UserProfile/UserView';
import cardsview from '../components/UserProfile/CardsView';

import CriptoLayout from '../layouts/CriptoLayout';
import CryptoTable from '../components/CriptoComponents/Index/CryptoIndex';
import NftView from '../components/CriptoComponents/Nft/Nft';

// Rutas para la barra lateral
export const sidebarRoutes = [
  { path: '/', name: 'Feed', icon: <RssFeedIcon /> },
  { path: '/cardsview', name: 'Seguidores', icon: <PeopleIcon /> },
  { path: '/chats', name: 'Chats', icon: <ChatIcon /> },
  { path: '/userprofile', name: 'Vista usuario', icon: <PersonIcon   /> },
  { path: '/saved', name: 'Elementos guardados', icon: <BookmarkIcon /> },
  { path: '/settings', name: 'Configuración', icon: <SettingsIcon /> },
];

// Rutas principales
const routes = [
  {
    path: '*',
    element: <SocialLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'cardsview', element: <cardsview /> },
      { path: 'chats', element: <Chat /> },
      { path: 'userprofile', element: <UserView /> },
      { path: 'saved', element: <SavedPosts /> },
      { path: 'settings', element: <Configuration /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cripto',
    element: < CriptoLayout/>,
    children: [
      { path: 'index', element: <Profile /> },
      { path: 'news', element: <UserView /> },
      { path: 'exchanges', element: <Chat /> },
      { path: 'ntf', element: <Configuration />},
      {path: 'saved', element: <SavedPosts />}
    ],
  },
];

export default routes;
