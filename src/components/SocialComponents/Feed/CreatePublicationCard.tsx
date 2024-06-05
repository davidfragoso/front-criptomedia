import React from 'react';
import Avatar from '../Navbar/Avatar'; // Asegúrate de que este componente esté disponible
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const styles = {
  cardContainer: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    marginBottom: '20px',
  },
  avatar: {
    marginRight: '10px',
  },
  inputContainer: {
    flexGrow: 1,
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '50px',
    padding: '10px 20px',
    marginRight: '10px',
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ffffff',
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
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
  },
  icon: {
    marginRight: '10px',
    color: '#ffffff',
    cursor: 'pointer',
  }
};

const CreatePublicationCard: React.FC = () => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.avatar}>
        <Avatar />
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
      <div style={styles.iconContainer}>
        <ImageIcon style={styles.icon} />
        <AttachFileIcon style={styles.icon} />
      </div>
    </div>
  );
};

export default CreatePublicationCard;
