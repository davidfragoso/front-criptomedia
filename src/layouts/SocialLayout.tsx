import React from 'react';
import Navbar from '../components/SocialComponents/Navbar/Navbar';
import Sidebar from '../components/SocialComponents/Sidebar/Sidebar';
import SubNavbar from '../components/SocialComponents/Navbar/SubNavbar';
import CreatePublicationCard from '../components/SocialComponents/Feed/CreatePublicationCard';
import { Outlet } from 'react-router-dom';

const styles = {
  appContainer: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    height: '100vh',
    width: '100vw',  // Aseguramos que ocupe todo el ancho de la ventana
    backgroundColor: '#1e1e1e',
  },
  mainContainer: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    flexGrow: 1,
    marginTop: '60px', 
    width: '100%',  // Aseguramos que ocupe todo el ancho
  },
  mainContent: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    flexGrow: 1,
    marginTop: '50px',
    width: '100%',  // Aseguramos que ocupe todo el ancho
  },
  sidebar: {
    width: '240px',
  },
  subNavbar: {
    position: 'fixed' as 'fixed',
    top: '60px', 
    width: 'calc(100% - 240px)',
    zIndex: 999,
    backgroundColor: '#12161C',
    borderBottom: '2px solid #27333E',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#12161C',
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    marginTop: '10px',
    width: '100%',  // Aseguramos que ocupe todo el ancho
  },
  leftColumn: {
    flex: '1',
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
  },
  centerColumn: {
    flex: '3',
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: '#12161C',
  },
  rightColumn: {
    flex: '1',
    borderRadius: '10px',
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
  },
};

const SocialLayout = () => {
  return (
    <div style={styles.appContainer}>
      <Navbar />
      <div style={styles.mainContainer}>
        <div style={styles.sidebar}>
          <Sidebar />
        </div>
        <div style={styles.mainContent}>
          <div style={styles.subNavbar}>
            <SubNavbar />
          </div>
          <div style={styles.content}>
            <div style={styles.leftColumn}>
              <p>Columna Izquierda</p>
            </div>
            <div style={styles.centerColumn}>
              <CreatePublicationCard />
              <Outlet />
            </div>
            <div style={styles.rightColumn}>
              <p>Columna Derecha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLayout;
