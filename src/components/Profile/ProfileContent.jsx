import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const baseStyles = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    color: '#ffffff',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 10px 0 10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  time: {
    fontSize: '0.8rem',
    color: '#888888',
  },
  content: {
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#d1d1d1',
    padding: '0 10px 0 10px',
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
  smallImagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: '1 1 40%',
  },
  smallImage: {
    width: '100%',
    height: 'calc(50% - 5px)',
    borderRadius: '10px',
    objectFit: 'cover',
    maxWidth: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10px',
    borderTop: '1px solid #27333E',
    padding: '10px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },
  iconText: {
    marginLeft: '5px',
    fontSize: '0.8rem',
  },
};

const ProfileContent = () => {
  const posts = [
    {
      username: 'Plipps',
      time: 'Hace 1 día',
      content: 'Me gustó el wallpaper',
      images: ['https://via.placeholder.com/1500x500'],
      initialLikes: 150,
      comments: 20,
      shares: 5,
    },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={baseStyles.container}>
              <div style={baseStyles.header}>
                <img
                  src="../images/yop.jfif"
                  alt="User avatar"
                  style={baseStyles.avatar}
                />
                <div style={baseStyles.userInfo}>
                  <span style={baseStyles.username}>{post.username}</span>
                  <span style={baseStyles.time}>{post.time}</span>
                </div>
              </div>
              <div style={baseStyles.content}>
                <p style={baseStyles.text}>{post.content}</p>
              </div>
              <div style={baseStyles.imagesContainer}>
                <img
                  src={post.images[0]}
                  alt="Wallpaper"
                  style={{ ...baseStyles.smallImage, width: '100%', borderRadius: '10px' }}
                />
              </div>
              <div style={baseStyles.footer}>
                <div style={baseStyles.iconButton}>
                  <FavoriteIcon style={{ color: post.liked ? 'red' : 'white' }} />
                  <span style={baseStyles.iconText}>{post.initialLikes}</span>
                </div>
                <div style={baseStyles.iconButton}>
                  <ChatBubbleIcon />
                  <span style={baseStyles.iconText}>{post.comments}</span>
                </div>
                <div style={baseStyles.iconButton}>
                  <ShareIcon />
                  <span style={baseStyles.iconText}>Compartir</span>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileContent;
