import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Drawer, useMediaQuery, Box, InputBase, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from './Avatar';
import Sidebar from '../Sidebar/Sidebar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

interface NavbarProps {
  toggleSidebar: () => void;
}

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
  maxWidth: '100%',
  margin: '0 auto',
  width: '100%',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '120px',
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
  [theme.breakpoints.up('sm')]: {
    display: 'none',
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
  [theme.breakpoints.down('sm')]: {
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

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isCryptoSelected, setIsCryptoSelected] = useState(false);
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggle = () => {
    setIsCryptoSelected(!isCryptoSelected);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
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
            <Logo src="../images/coinverse2-logo.png" alt="Logo" />
          </LogoContainer>
          <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="Buscar..." />
          </SearchContainer>
          <Spacer />
          <SliderContainer>
            <span style={{ marginRight: '0.5rem', color: isCryptoSelected ? 'white' : '#FF8A00' }}>Social</span>
            <Switch
              checked={isCryptoSelected}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
              color="default"
            />
            <span style={{ marginLeft: '0.5rem', color: isCryptoSelected ? '#FF8A00' : 'white' }}>Criptomonedas</span>
          </SliderContainer>
          <DesktopOnly>
            <MenuItemStyled>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <InboxIcon />
                </Badge>
              </IconButton>
            </MenuItemStyled>
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
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
        </CustomToolbar>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <Sidebar />
        </Drawer>
      </CustomAppBar>
    </ThemeProvider>
  );
};

export default Navbar;
