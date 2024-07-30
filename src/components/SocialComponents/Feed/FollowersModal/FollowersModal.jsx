import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#1E2730',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    p: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#27333E',
    borderRadius: '8px',
    p: 1,
    mb: 3,
  },
  searchInput: {
    ml: 1,
    flex: 1,
    color: 'white',
  },
  listItem: {
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2A3B47',
    },
  },
  listItemText: {
    color: 'white',
  },
};

const FollowersModal = ({ open, onClose, followers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollowerClick = (followerId) => {
    navigate(`/chats/${followerId}`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>Seguidores ({followers.length})</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={styles.searchBox}>
          <SearchIcon />
          <InputBase
            placeholder="Buscar seguidores..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={styles.searchInput}
          />
        </Box>
        <List>
          {filteredFollowers.map(follower => (
            <div key={follower.id}>
              <ListItem button onClick={() => handleFollowerClick(follower.id)} sx={styles.listItem}>
                <ListItemAvatar>
                  <Avatar src={follower.avatar} />
                </ListItemAvatar>
                <ListItemText primary={follower.name} sx={styles.listItemText} />
              </ListItem>
              <Divider light sx={{ backgroundColor: '#444' }} />
            </div>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default FollowersModal;
