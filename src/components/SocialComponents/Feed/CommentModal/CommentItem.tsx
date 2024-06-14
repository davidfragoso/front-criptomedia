import React, { useState, forwardRef } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Comment } from './types';
import { formatTimeAgo, formatNumber } from '../../../../utils/utils';

interface CommentItemProps {
  comment: Comment;
  handleCommentLike: (commentId: number) => void;
}

const CommentItem = forwardRef<HTMLDivElement, CommentItemProps>(({ comment, handleCommentLike }, ref) => {
  return (
    <Box ref={ref}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img
          src={comment.avatar}
          alt={`${comment.username}'s avatar`}
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography>
            <strong>{comment.username}</strong> {formatTimeAgo(comment.timestamp)}
          </Typography>
          <Typography>{comment.text}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <IconButton onClick={() => handleCommentLike(comment.id)} sx={{ p: 0 }}>
              <FavoriteIcon style={{ color: comment.liked ? 'red' : 'white' }} />
            </IconButton>
            <Typography sx={{ ml: 1 }}>{formatNumber(comment.likes)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default CommentItem;
