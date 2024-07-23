import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#1E2730',
    color: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#27333E',
    borderRadius: '4px',
    p: '10px',
    mb: '20px',
  },
  searchInput: {
    ml: '10px',
    color: 'white',
    flexGrow: 1,
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
        <Typography variant="h6">Seguidores ({followers.length})</Typography>
        <Box sx={styles.searchBox}>
          <SearchIcon />
          <TextField
            placeholder="Buscar seguidores..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={styles.searchInput}
          />
        </Box>
        <List>
          {filteredFollowers.map(follower => (
            <div key={follower.id}>
              <ListItem button onClick={() => handleFollowerClick(follower.id)}>
                <ListItemAvatar>
                  <Avatar src={follower.avatar} />
                </ListItemAvatar>
                <ListItemText primary={follower.name} />
              </ListItem>
              <Divider light />
            </div>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default FollowersModal;
