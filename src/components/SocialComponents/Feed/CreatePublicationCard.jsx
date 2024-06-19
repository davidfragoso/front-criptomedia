import React, { useState } from 'react';
import AvatarImage from '../Navbar/AvatarImage';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
};

const CreatePublicationCard = ({ onCreatePost }) => {
  const [text, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => prevImages.concat(filesArray));
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file)); // free memory
    }
    console.log('Imágenes seleccionadas:', selectedImages);
  };

  const handleSubmit = () => {
    console.log('Creando post con texto:', text);
    console.log('Creando post con imágenes:', selectedImages);
    onCreatePost(text, selectedImages);
    setText('');
    setSelectedImages([]);
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
          <input type="file" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>
        <div style={styles.iconWrapper}>
          <AttachFileIcon style={styles.icon} />
          <span>Adjuntar</span>
        </div>
      </div>
      {selectedImages.length > 0 && (
        <div style={styles.previewContainer}>
          {selectedImages.map((image, index) => (
            <img key={index} src={image} alt={`preview ${index}`} style={styles.previewImage} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePublicationCard;
