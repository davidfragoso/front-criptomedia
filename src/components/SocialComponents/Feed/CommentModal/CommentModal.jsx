import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

/**
 * @typedef {Object} Comment
 * @property {number} id - El ID del comentario.
 * @property {string} username - El nombre de usuario del autor del comentario.
 * @property {string} avatar - La URL del avatar del autor del comentario.
 * @property {string} text - El texto del comentario.
 * @property {number} likes - La cantidad de likes que tiene el comentario.
 * @property {boolean} liked - Si el comentario ha sido likeado por el usuario actual.
 * @property {number} timestamp - La marca de tiempo del comentario.
 */

const baseStyles = {
  commentDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#888888',
    margin: '10px 0',
  },
};

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.handleClose
 * @param {Comment[]} props.commentList
 * @param {(commentId: number) => void} props.handleCommentLike
 * @param {(text: string) => void} props.handleAddComment
 * @param {number} [props.newCommentId]
 */
const CommentModal = forwardRef(({
  open,
  handleClose,
  commentList = [],
  handleCommentLike,
  handleAddComment,
  newCommentId,
}, ref) => {
  const [newComment, setNewComment] = useState('');
  const newCommentRef = useRef(null);

  useEffect(() => {
    if (newCommentRef.current) {
      newCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [newCommentId]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      handleAddComment(newComment);
      setNewComment('');
    }
  };

  const renderComments = (comments) => {
    return Array.isArray(comments) ? comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <CommentItem
          comment={comment}
          handleCommentLike={handleCommentLike}
          ref={comment.id === newCommentId ? newCommentRef : null}
        />
        <Box sx={baseStyles.commentDivider}></Box>
      </React.Fragment>
    )) : null;
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
});

CommentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      liked: PropTypes.bool.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleCommentLike: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  newCommentId: PropTypes.number,
};

export default CommentModal;
