import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Comment } from './types';
import CommentItem from './CommentItem';
import { CSSProperties } from 'react';

const baseStyles: { [key: string]: CSSProperties } = {
  commentDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#888888',
    margin: '10px 0',
  },
};

interface CommentModalProps {
  open: boolean;
  handleClose: () => void;
  commentList: Comment[];
  handleCommentLike: (commentId: number) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, handleClose, commentList, handleCommentLike }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'mil';
    }
    return num.toString();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: '60%', lg: '50%' },
          bgcolor: '#1E2730',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          color: 'white',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h6" component="h2">
          Comentarios
        </Typography>
        <Box>
          {commentList.map((comment) => (
            <React.Fragment key={comment.id}>
              <CommentItem 
                comment={comment} 
                handleCommentLike={handleCommentLike} 
                formatNumber={formatNumber} 
              />
              <Box sx={baseStyles.commentDivider}></Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
