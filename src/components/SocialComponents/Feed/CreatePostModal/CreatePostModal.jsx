import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import images from '../../../../imageRoutes';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#1E2730',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    p: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  inputField: {
    width: '100%',
    bgcolor: '#27333E',
    borderRadius: '8px',
    color: 'white',
    p: 1,
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#444',
      },
      '&:hover fieldset': {
        borderColor: '#666',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#888',
      },
    },
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    mt: 2,
  },
  iconButton: {
    color: 'white',
  },
  previewContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  previewImage: {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  previewFile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffffff',
  },
};

const CreatePostModal = ({ open, onClose, onCreatePost }) => {
  const [text, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => prevImages.concat(filesArray));
      Array.from(e.target.files).forEach(file => URL.revokeObjectURL(file)); // free memory
    }
    console.log('Imágenes seleccionadas:', selectedImages);
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const pdfFiles = filesArray.filter(file => file.type === 'application/pdf');
      setSelectedFiles(prevFiles => prevFiles.concat(pdfFiles));
    }
    console.log('Archivos seleccionados:', selectedFiles);
  };

  const handleSubmit = () => {
    console.log('Creando post con texto:', text);
    console.log('Creando post con imágenes:', selectedImages);
    console.log('Creando post con archivos:', selectedFiles);
    onCreatePost(text, selectedImages, selectedFiles);
    setText('');
    setSelectedImages([]);
    setSelectedFiles([]);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>Crear Publicación</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
        <img src={images.user} alt="Decorative Orange" style={{ width: '50px', margin: '20px' }} />
        <TextField
            placeholder="Escribe algo..."
            multiline
            rows={4}
            value={text}
            onChange={handleInputChange}
            sx={styles.inputField}
            variant="outlined"
          />
        </Box>
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
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <IconButton component="span" sx={styles.iconButton}>
              <AttachFileIcon />
            </IconButton>
          </label>
        </Box>
        {selectedImages.length > 0 && (
          <Box sx={styles.previewContainer}>
            {selectedImages.map((image, index) => (
              <img key={index} src={image} alt={`preview ${index}`} style={styles.previewImage} />
            ))}
          </Box>
        )}
        {selectedFiles.length > 0 && (
          <Box sx={styles.previewContainer}>
            {selectedFiles.map((file, index) => (
              <Box key={index} sx={styles.previewFile}>
                <AttachFileIcon />
                <Typography>{file.name}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          Publicar
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
