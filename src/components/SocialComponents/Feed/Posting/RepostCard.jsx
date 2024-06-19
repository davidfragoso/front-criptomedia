import React from 'react';
import { Box, Typography } from '@mui/material';
import PostContent from './PostContent';
import PostImages from './PostImages';
import { formatTimeAgo } from '../../../../utils/utils';

const repostStyles = {
  repostContainer: {
    border: '1px solid #27333E',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#1E2730',
    margin: '20px',
  },
  repostUserInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  repostAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  repostUsername: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  repostTime: {
    fontSize: '0.7rem',
    color: '#888888',
  },
};

const RepostCard = ({ repostedBy, repostedByAvatar, repostTime, post }) => {
  const { username, time, content = '', images = [], initialLikes, comments, shares } = post;

  // Asegúrate de que content es una cadena y images es un arreglo
  const displayContent = typeof content === 'string' ? content : '';
  const displayImages = Array.isArray(images) ? images : [];

  return (
    <Box sx={repostStyles.repostContainer}>
      <Box sx={repostStyles.repostUserInfo}>
        <img
          src="../images/yop.jfif"
          alt="User avatar"
          style={repostStyles.repostAvatar}
        />
        <Box>
          <Typography sx={repostStyles.repostUsername}>{username}</Typography>
          <Typography sx={repostStyles.repostTime}>{formatTimeAgo(time)}</Typography>
        </Box>
      </Box>
      <PostContent content={displayContent} />
      <PostImages images={displayImages} handleImageClick={() => {}} />
    </Box>
  );
};

export default RepostCard;
