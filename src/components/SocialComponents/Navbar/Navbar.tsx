import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InboxIcon from '@mui/icons-material/Inbox';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "./Avatar";

const styles = {
  customAppBar: {
    position: 'fixed' as 'fixed',
    width: '100%',
    zIndex: 1000,
    padding: '0.5rem 1rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    height: '50px',
    borderBottom: '2px solid #27333E' // Agregar el borde inferior
  },
  customAppBarBackground: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#12161C',
    zIndex: -1
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '120px'
  },
  spacer: {
    flexGrow: 1
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem'
  },
  sliderLabel: {
    margin: '0 0.5rem',
    transition: 'color 0.3s'
  },
  sliderLabelSelected: {
    color: '#FF8A00'
  },
  switch: {
    position: 'relative' as 'relative',
    display: 'inline-block',
    width: '34px',
    height: '20px'
  },
  switchInput: {
    opacity: 0,
    width: '0',
    height: '0'
  },
  slider: {
    position: 'absolute' as 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#ccc',
    transition: '.4s',
    borderRadius: '34px'
  },
  sliderBefore: {
    position: 'absolute' as 'absolute',
    content: '""',
    height: '14px',
    width: '14px',
    left: '3px',
    bottom: '3px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%'
  },
  sliderChecked: {
    backgroundColor: '#FF8A00'
  },
  sliderCheckedBefore: {
    transform: 'translateX(14px)'
  },
  menuItem: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    marginRight: '1rem',
    color: 'white'
  },
  avatarContainer: {
    display: 'flex' as 'flex',
    alignItems: 'center'
  }
};

const CustomAppBar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={styles.customAppBar}>
    <div style={styles.customAppBarBackground} />
    {children}
  </div>
);

const Toolbar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={styles.toolbar}>
    {children}
  </div>
);

const Navbar: React.FC = () => {
  const [isCryptoSelected, setIsCryptoSelected] = useState(false);

  const handleToggle = () => {
    setIsCryptoSelected(!isCryptoSelected);
  };

  return (
    <CustomAppBar>
      <Toolbar>
        <div style={styles.logoContainer}>
          <img src="../images/coinverse2-logo.png" alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.spacer} />
        <div style={styles.sliderContainer}>
          <span style={{ ...styles.sliderLabel, ...(isCryptoSelected ? {} : styles.sliderLabelSelected) }}>
            Social
          </span>
          <label style={styles.switch}>
            <input type="checkbox" onChange={handleToggle} style={styles.switchInput} />
            <span style={{ 
              ...styles.slider, 
              ...(isCryptoSelected ? styles.sliderChecked : {}) 
            }}>
              <span style={{ 
                ...styles.sliderBefore, 
                ...(isCryptoSelected ? styles.sliderCheckedBefore : {}) 
              }}></span>
            </span>
          </label>
          <span style={{ ...styles.sliderLabel, ...(isCryptoSelected ? styles.sliderLabelSelected : {}) }}>
            Criptomonedas
          </span>
        </div>
        <MenuItem style={styles.menuItem}>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <InboxIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <div style={styles.avatarContainer}>
          <Avatar />
        </div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
