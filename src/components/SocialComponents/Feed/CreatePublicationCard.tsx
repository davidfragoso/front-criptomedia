import React from 'react';
import AvatarImage from '../Navbar/AvatarImage';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const styles = {
  cardContainer: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    margin: '10px 0 10px',
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
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '5px',
  },
};

const CreatePublicationCard: React.FC = () => {
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
            style={styles.input}
          />
          <button style={styles.sendButton}>
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
        <div style={styles.iconWrapper}>
          <ImageIcon style={styles.icon} />
          <span>Imagen</span>
        </div>
        <div style={styles.iconWrapper}>
          <AttachFileIcon style={styles.icon} />
          <span>Adjuntar</span>
        </div>
      </div>
    </div>
  );
};

export default CreatePublicationCard;
