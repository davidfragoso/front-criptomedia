import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import NewsIcon from '@mui/icons-material/Announcement';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import NftIcon from '@mui/icons-material/Collections';

const styles = {
  sidebar: {
    backgroundColor: '#12161C',
    color: '#ffffff',
    height: '100vh',
    paddingTop: '20px',
    borderRight: '2px solid #27333E',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  listItemSelected: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderLeft: '4px solid #ff8a00',
  },
  listItemIcon: {
    color: '#ffffff',
  },
  listItemTextPrimary: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  divider: {
    backgroundColor: '#444444',
    margin: '10px 0',
  },
};

const Sidebar = ({ layoutType }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  const socialItems = [
    { text: 'Feed', icon: <RssFeedIcon />, path: '/' },
    { text: 'Seguidores', icon: <PeopleIcon />, path: '/cardsview' },
    { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
    { text: 'Vistas de usuario', icon: <PersonIcon />, path: '/userprofile' },
    { text: 'Elementos guardados', icon: <BookmarkIcon />, path: '/saved' },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
  ];

  const cryptoItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/cripto' },
    { text: 'Noticias', icon: <NewsIcon />, path: '/news' },
    { text: 'Intercambios', icon: <SwapHorizIcon />, path: '/exchanges' },
    { text: 'NFT\'s populares', icon: <NftIcon />, path: '/nfts' },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
  ];

  const items = layoutType === 'social' ? socialItems : cryptoItems;

  return (
    <div style={styles.sidebar}>
      <List component="nav">
        {items.map((item, index) => (
          <ListItem
            button
            key={index}
            style={selectedIndex === index ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
            onClick={(event) => handleListItemClick(event, index, item.path)}
          >
            <ListItemIcon style={styles.listItemIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} style={styles.listItemTextPrimary} />
          </ListItem>
        ))}
        <Divider style={styles.divider} />
      </List>
    </div>
  );
};

export default Sidebar;
