import React, { useState } from 'react';
import AvatarImage from '../../Navbar/AvatarImage';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';

const styles = {
  cardContainer: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 0 20px',
  },
  avatar: {
    marginRight: '5px',
  },
  inputContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '50px',
    padding: '10px 10px',
    width: '100%',
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#1d1d1d',
    outline: 'none',
    flexGrow: 1,
    fontSize: '16px',
  },
  sendButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10px',
    width: '100%',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '5px',
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

const CreatePublicationCard = ({ onCreatePost }) => {
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
      Array.from(e.target.files).forEach(file => URL.revokeObjectURL(file));
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const pdfFiles = filesArray.filter(file => file.type === 'application/pdf');
      setSelectedFiles(prevFiles => prevFiles.concat(pdfFiles));
    }
  };

  const handleSubmit = async () => {
    console.log('Creando post con texto:', text);
    console.log('Creando post con imágenes:', selectedImages);
    console.log('Creando post con archivos:', selectedFiles);
    const userId = localStorage.getItem('LoggedUser');

    try {
      const response = await axios.post('https://coinversesocialapi.azurewebsites.net/api/Posts', {
        pkPost: 0,
        fkUser: userId,
        fkTypePost: 1,
        text: text,
        idPostShared: null,
        date: new Date().toISOString()
      });
      console.log('Post creado:', response.data);

      onCreatePost({
        id: response.data.pkPost,
        text,
        images: selectedImages,
        files: selectedFiles,
        userId,
        date: new Date().toISOString()
      });

      setText('');
      setSelectedImages([]);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error creando el post:', error);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={styles.avatar}>
          <AvatarImage />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Crear una publicación..."
            value={text}
            onChange={handleInputChange}
            style={styles.input}
            id="post-text-input"
            name="post-text"
          />
          <button style={styles.sendButton} onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
      <div style={styles.iconContainer}>
        <label style={styles.iconWrapper}>
          <ImageIcon style={styles.icon} />
          <span>Imagen</span>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="image-upload" name="image-upload" />
        </label>
        <label style={styles.iconWrapper}>
          <AttachFileIcon style={styles.icon} />
          <span>Adjuntar</span>
          <input type="file" multiple accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload" name="file-upload" />
        </label>
      </div>
      {selectedImages.length > 0 && (
        <div style={styles.previewContainer}>
          {selectedImages.map((image, index) => (
            <img key={index} src={image} alt={`preview ${index}`} style={styles.previewImage} />
          ))}
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div style={styles.previewContainer}>
          {selectedFiles.map((file, index) => (
            <div key={index} style={styles.previewFile}>
              <AttachFileIcon />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePublicationCard;
