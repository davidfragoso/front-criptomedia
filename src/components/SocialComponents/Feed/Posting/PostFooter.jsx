import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';

const styles = {
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

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'mil';
  }
  return num.toString();
};

const PostFooter = ({ likes, liked, handleLikeClick, comments, handleOpen, handleShare }) => {
  return (
    <div style={styles.footer}>
      <div style={styles.iconButton} onClick={handleLikeClick}>
        <FavoriteIcon style={{ color: liked ? 'red' : 'white' }} />
        <span style={styles.iconText}>{formatNumber(likes)}</span>
      </div>
      <div style={styles.iconButton} onClick={handleOpen}>
        <ChatBubbleIcon />
        <span style={styles.iconText}>{formatNumber(comments)}</span>
      </div>
      <div style={styles.iconButton} onClick={handleShare}>
        <ShareIcon />
        <span style={styles.iconText}>Compartir</span>
      </div>
    </div>
  );
};

export default PostFooter;
