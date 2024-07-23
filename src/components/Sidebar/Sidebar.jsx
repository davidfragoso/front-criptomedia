import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import NewsIcon from '@mui/icons-material/Announcement';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import NftIcon from '@mui/icons-material/Collections';
import PersonIcon from '@mui/icons-material/Person'; // Agrega esta línea
import { Box, useMediaQuery, Switch, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import images from '../../imageRoutes';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const styles = {
  sidebar: {
    backgroundColor: '#12161C',
    color: '#ffffff',
    height: '100vh',
    paddingTop: '20px',
    borderRight: '2px solid #27333E',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingBottom: '10px',
  },
};

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  cursor: 'pointer',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 1rem',
  paddingBottom: '10px',
  justifyContent: 'center',
}));

const Sidebar = ({ layoutType, onToggleLayoutType }) => {
  const [isCryptoSelected, setIsCryptoSelected] = useState(layoutType === 'crypto');

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    { text: 'Noticias', icon: <NewsIcon />, path: '/cripto/news' },
    { text: 'Intercambios', icon: <SwapHorizIcon />, path: '/cripto/exchanges' },
    { text: 'NFT\'s populares', icon: <NftIcon />, path: '/cripto/nft' },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/cripto/settings' },
  ];

  const items = layoutType === 'social' ? socialItems : cryptoItems;

  useEffect(() => {
    const currentItem = items.findIndex(item => item.path === location.pathname);
    setSelectedIndex(currentItem !== -1 ? currentItem : 0);
  }, [location.pathname, items]);

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };
  const handleToggle = () => {
    setIsCryptoSelected(!isCryptoSelected);
    onToggleLayoutType(isCryptoSelected ? 'social' : 'crypto');
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.sidebar}>
        <div>
          {isMobile && (
            <div style={styles.logoContainer}>
              <Logo src={images.coinverseLogo} alt="Coinverse Logo" />
            </div>
          )}
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
        {isMobile && (
          <SliderContainer>
            <span style={{ marginRight: '0.5rem', color: isCryptoSelected ? 'white' : '#FF8A00' }}>Social</span>
            <Switch
              checked={isCryptoSelected}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
              color="warning"
            />
            <span style={{ marginLeft: '0.5rem', color: isCryptoSelected ? '#FF8A00' : 'white' }}>Criptomonedas</span>
          </SliderContainer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
