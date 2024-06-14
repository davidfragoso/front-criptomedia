import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
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
  handleAddComment: (text: string) => void;
  newCommentId?: number;
}

const CommentModal: React.FC<CommentModalProps> = ({
  open,
  handleClose,
  commentList,
  handleCommentLike,
  handleAddComment,
  newCommentId,
}) => {
  const [newComment, setNewComment] = useState('');
  const newCommentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (newCommentRef.current) {
      newCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentList]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      handleAddComment(newComment);
      setNewComment('');
    }
  };

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <CommentItem
          comment={comment}
          handleCommentLike={handleCommentLike}
          ref={comment.id === newCommentId ? newCommentRef : null}
        />
        <Box sx={baseStyles.commentDivider}></Box>
      </React.Fragment>
    ));
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
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6" component="h2">
          Comentarios
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {renderComments(commentList)}
        </Box>
        <Box sx={{ display: 'flex', mt: 2, bgcolor: '#1E2730', pt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
            sx={{ bgcolor: 'white', borderRadius: '5px' }}
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ ml: 1 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
