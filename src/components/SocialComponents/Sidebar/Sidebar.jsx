import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { sidebarRoutes } from '../../../routes/routes';

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

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  const handleListItemClick = (event, path) => {
    setSelectedPath(path);
    navigate(path);
  };

  return (
    <div style={styles.sidebar}>
      <List component="nav">
        {sidebarRoutes.map((route) => (
          <ListItem
            button
            key={route.path}
            style={selectedPath === route.path ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
            onClick={(event) => handleListItemClick(event, route.path)}
          >
            <ListItemIcon style={styles.listItemIcon}>
              {route.icon}
            </ListItemIcon>
            <ListItemText primary={route.name} style={styles.listItemTextPrimary} />
          </ListItem>
        ))}
        <Divider style={styles.divider} />
      </List>
    </div>
  );
};

export default Sidebar;
