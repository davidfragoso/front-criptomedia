import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Drawer,
  useMediaQuery,
  Box,
  InputBase,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Avatar from './Avatar';
import Sidebar from '../Sidebar/Sidebar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

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

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  zIndex: 1000,
  padding: '0.5rem 1rem',
  color: 'white',
  display: 'flex',
  height: '70px',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: 0,
  borderBottom: '2px solid #27333E',
  backgroundColor: '#12161C',
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '95%',
  margin: '0 auto',
  width: '100%',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '120px',
  cursor: 'pointer',
}));

const Spacer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  margin: '0 1rem',
  backgroundColor: '#27333E',
  borderRadius: '8px',
  padding: '0.5rem',
  maxWidth: '80%',

  [theme.breakpoints.down(500)]: {
    display: 'none',
  },
}));

const SearchIconContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(500)]: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    color: 'white',
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  flexGrow: 1,
  outline: 'none',
  marginLeft: '0.5rem',
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  color: 'white',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileOnly = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const DesktopOnly = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Navbar = ({ layoutType, toggleSidebar, onShowProfile }) => {
  const [isCryptoSelected, setIsCryptoSelected] = useState(layoutType === 'crypto');
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsCryptoSelected(!isCryptoSelected);
    navigate(isCryptoSelected ? '/' : '/cripto');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar>
        <CustomToolbar>
          {isTabletOrMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer>
            <Logo src="../images/coinverse2-logo.png" alt="Logo" onClick={handleLogoClick} />
          </LogoContainer>
          {/* {layoutType !== 'crypto' && (
            <SearchContainer>
              <SearchIcon />
              <SearchInput placeholder="Buscar..." />
            </SearchContainer>
          )} */}
          <SearchIconContainer>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </SearchIconContainer>
          <Spacer />
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
          <DesktopOnly>
            {/* <MenuItemStyled>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <InboxIcon />
                </Badge>
              </IconButton>
            </MenuItemStyled> */}
          </DesktopOnly>
          <MobileOnly>
            <MenuItemStyled>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" sx={{ marginRight: '0.5rem' }}>
                <Badge badgeContent={17} color="error">
                  <InboxIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 12 new messages" color="inherit">
                <Badge badgeContent={12} color="error">
                  <ChatBubbleIcon />
                </Badge>
              </IconButton>
            </MenuItemStyled>
          </MobileOnly>
          <Avatar onShowProfile={onShowProfile} />
        </CustomToolbar>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <Sidebar layoutType={layoutType} />
        </Drawer>
      </CustomAppBar>
    </ThemeProvider>
  );
};

export default Navbar;
