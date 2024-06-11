import React, { useState } from 'react';
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

const styles = {
  sidebar: {
    backgroundColor: '#12161C',
    color: '#ffffff',
    height: '100vh',
    paddingTop: '20px',
    borderRight: '2px solid #27333E'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px'
  },
  listItemSelected: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderLeft: '4px solid #ff8a00'
  },
  listItemIcon: {
    color: '#ffffff'
  },
  listItemTextPrimary: {
    fontSize: '1rem',
    fontWeight: 500
  },
  divider: {
    backgroundColor: '#444444',
    margin: '10px 0'
  }
};

const Sidebar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div style={styles.sidebar}>
      <List component="nav">
        <ListItem
          button
          style={selectedIndex === 0 ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon style={styles.listItemIcon}>
            <RssFeedIcon />
          </ListItemIcon>
          <ListItemText primary="Feed" style={styles.listItemTextPrimary} />
        </ListItem>
        <ListItem
          button
          style={selectedIndex === 1 ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon style={styles.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Seguidores" style={styles.listItemTextPrimary} />
        </ListItem>
        <ListItem
          button
          style={selectedIndex === 2 ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon style={styles.listItemIcon}>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" style={styles.listItemTextPrimary} />
        </ListItem>
        <Divider style={styles.divider} />
        <ListItem
          button
          style={selectedIndex === 3 ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon style={styles.listItemIcon}>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Elementos guardados" style={styles.listItemTextPrimary} />
        </ListItem>
        <ListItem
          button
          style={selectedIndex === 4 ? { ...styles.listItem, ...styles.listItemSelected } : styles.listItem}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon style={styles.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" style={styles.listItemTextPrimary} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
