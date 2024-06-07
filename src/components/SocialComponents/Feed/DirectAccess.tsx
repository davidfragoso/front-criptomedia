import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';

const styles = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    color: '#ffffff',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    marginBottom: '10px',
  },
  item: {
    display: 'flex',
    alignItems: 'center' as 'center',
    width: '100%',
    padding: '10px 0',
    cursor: 'pointer',
    color: '#ffffff',
    textDecoration: 'none' as 'none',
  },
  icon: {
    marginRight: '10px',
    color: '#ff8a00',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#27333E',
    margin: '10px 0',
  }
};

const DirectAccess: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Crear</div>
      <div style={styles.item}>
        <CreateIcon style={styles.icon} />
        <span>Publicación</span>
      </div>
      <div style={styles.divider}></div>
      <div style={styles.item}>
        <GroupIcon style={styles.icon} />
        <span>Grupo</span>
      </div>
      <div style={styles.divider}></div>
      <div style={styles.item}>
        <ChatIcon style={styles.icon} />
        <span>Chat</span>
      </div>
    </div>
  );
};

export default DirectAccess;
