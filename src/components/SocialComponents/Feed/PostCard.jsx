import React, { useState, useEffect } from 'react';
import { Backdrop, Menu, MenuItem, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostHeader from './Posting/PostHeader';
import PostContent from './Posting/PostContent';
import PostImages from './Posting/PostImages';
import PostFooter from './Posting/PostFooter';
import CommentModal from './CommentModal/CommentModal';
import { formatTimeAgo, formatNumber } from '../../../utils/utils';

const baseStyles = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    color: '#ffffff',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'opacity 0.3s ease-out',
  },
  hidden: {
    opacity: 0,
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  fullImage: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#12161C',
    color: '#FFF',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFF',
      },
      '&:hover fieldset': {
        borderColor: '#FFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#FFF',
    },
    '& .MuiInputBase-input': {
      color: '#FFF',
    },
  },
};

const PostCard = ({ id, username, time, content, images = [], initialLikes = 0, comments = [], shares = 0, onDeletePost, onUpdatePost }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [open, setOpen] = useState(false);
  const [commentList, setCommentList] = useState(Array.isArray(comments) ? comments : []);
  const [newCommentId, setNewCommentId] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setCommentList(Array.isArray(comments) ? comments : []);
  }, [comments]);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes((prevLikes) => liked ? prevLikes - 1 : prevLikes + 1);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommentLike = (commentId) => {
    const updateLikes = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + (comment.liked ? -1 : 1), liked: !comment.liked };
        }
        return comment;
      });
    };
    setCommentList(prevComments => updateLikes(prevComments));
  };

  const handleAddComment = (text) => {
    const newComment = {
      id: commentList.length + 1,
      username: 'Nuevo Usuario',
      avatar: '../images/yop.jfif',
      text,
      likes: 0,
      liked: false,
      parentId: null,
      timestamp: Date.now(),
    };
    setCommentList([...commentList, newComment]);
    setNewCommentId(newComment.id);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
    setSelectedImage(null);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDeletePost(id);
    }, 500); // Esperar 500ms para completar la animación de desvanecimiento
    handleMenuClose();
  };

  const handleEdit = () => {
    setEditedContent(content);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditSave = () => {
    onUpdatePost(id, editedContent);
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  return (
    <div style={{ ...baseStyles.container, ...(isVisible ? {} : baseStyles.hidden) }}>
      <div style={{ position: 'relative' }}>
        <PostHeader username={username} time={formatTimeAgo(time)} />
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          style={{ position: 'absolute', right: '10px', top: '10px', color: '#888888' }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
      </div>
      <PostContent content={content} />
      <PostImages images={images} handleImageClick={handleImageClick} />
      <PostFooter
        likes={formatNumber(likes)}
        liked={liked}
        handleLikeClick={handleLikeClick}
        comments={commentList.length}
        handleOpen={handleOpen}
      />
      <CommentModal 
        open={open} 
        handleClose={handleClose} 
        commentList={commentList} 
        handleCommentLike={handleCommentLike}
        handleAddComment={handleAddComment}
        newCommentId={newCommentId || undefined}
      />
      <Backdrop style={baseStyles.backdrop} open={openImage} onClick={handleCloseImage}>
        {selectedImage && <img src={selectedImage} alt="Selected" style={baseStyles.fullImage} />}
      </Backdrop>
      <Modal
        open={editModalOpen}
        onClose={handleEditCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box sx={baseStyles.modalContent}>
          <TextField
            fullWidth
            label="Editar contenido"
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={baseStyles.textField}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleEditCancel} variant="outlined" color="warning">Cancelar</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Guardar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCard;
