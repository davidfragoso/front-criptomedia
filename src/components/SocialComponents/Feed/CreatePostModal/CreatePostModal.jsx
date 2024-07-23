import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  inputField: {
    width: '100%',
    bgcolor: '#27333E',
    borderRadius: '10px',
    color: 'white',
    p: 2,
    mb: 2,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
  },
  iconButton: {
    color: 'white',
  },
};

const CreatePostModal = ({ open, onClose, onCreatePost }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleImageUpload = (event) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleAttachmentUpload = (event) => {
    if (event.target.files) {
      const newAttachments = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const handleCreatePost = () => {
    onCreatePost(text, images, attachments);
    setText('');
    setImages([]);
    setAttachments([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <TextField
          placeholder="Crear una publicación..."
          multiline
          rows={4}
          value={text}
          onChange={e => setText(e.target.value)}
          sx={styles.inputField}
        />
        <Box sx={styles.iconContainer}>
          <label>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <IconButton component="span" sx={styles.iconButton}>
              <ImageIcon />
            </IconButton>
          </label>
          <label>
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleAttachmentUpload}
            />
            <IconButton component="span" sx={styles.iconButton}>
              <AttachFileIcon />
            </IconButton>
          </label>
        </Box>
        <Button variant="contained" color="primary" onClick={handleCreatePost} sx={{ mt: 2 }}>
          Publicar
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
