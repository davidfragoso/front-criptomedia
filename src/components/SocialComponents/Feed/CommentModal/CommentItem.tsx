import React from 'react';
import { IconButton, Typography, Box, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Comment } from './types';

interface CommentItemProps {
  comment: Comment;
  handleCommentLike: (commentId: number) => void;
  formatNumber: (num: number) => string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, handleCommentLike, formatNumber }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <img
        src={comment.avatar}
        alt={`${comment.username}'s avatar`}
        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography>
          <strong>{comment.username}</strong> Hace 22 min
        </Typography>
        <Typography>{comment.text}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton onClick={() => handleCommentLike(comment.id)} sx={{ p: 0 }}>
            <FavoriteIcon style={{ color: comment.liked ? 'red' : 'white' }} />
          </IconButton>
          <Typography sx={{ ml: 1 }}>{formatNumber(comment.likes)}</Typography>
          <Button sx={{ color: '#888888', ml: 2 }}>Responder</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
