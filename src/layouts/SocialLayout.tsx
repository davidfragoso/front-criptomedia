import React from 'react';
import Navbar from '../components/SocialComponents/Navbar/Navbar';
import Sidebar from '../components/SocialComponents/Sidebar/Sidebar';
import SubNavbar from '../components/SocialComponents/Navbar/SubNavbar';
import CreatePublicationCard from '../components/SocialComponents/Feed/CreatePublicationCard';
import { Outlet } from 'react-router-dom';
import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1e1e1e',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: '60px',
    width: '100%',
  },
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '240px',
    height: 'calc(100vh - 60px)',
    overflowY: 'hidden',
    backgroundColor: '#12161C',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
  },
  subNavbar: {
    width: '100%',
    marginTop: '8px',
    zIndex: 999,
    backgroundColor: '#12161C',
    borderBottom: '2px solid #27333E',
  },
  content: {
    flexGrow: 1,
    padding: '10px',
    backgroundColor: '#12161C',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
  },
  centerColumn: {
    flex: 3,
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: '#12161C',
  },
  rightColumn: {
    flex: 1,
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
