import React, { useState } from 'react';
import Navbar from '../components/SocialComponents/Navbar/Navbar';
import Sidebar from '../components/SocialComponents/Sidebar/Sidebar';
import SubNavbar from '../components/SocialComponents/Navbar/SubNavbar';
import CreatePublicationCard from '../components/SocialComponents/Feed/CreatePublicationCard';
import PostCard from '../components/SocialComponents/Feed/PostCard';
import DirectAccess from '../components/SocialComponents/Feed/DirectAccess';
import NewsSection from '../components/SocialComponents/Feed/NewsSection';
import AdsSection from '../components/SocialComponents/Feed/AdsSection';
import ChatBox from '../components/SocialComponents/ChatBox/ChatBox';
import { Outlet } from 'react-router-dom';
import { CSSProperties } from 'react';
import '../App.css'; 

const styles: { [key: string]: CSSProperties } = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1e1e1e',
    overflow: 'hidden',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: '60px',
    width: '100%',
    overflow: 'auto', 
  },
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '240px',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#12161C',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
    overflow: 'auto', 
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
    backgroundColor: '#12161C',
    overflow: 'auto'
  },
  centerColumn: {
    flex: 3,
    marginRight: '10px',
    borderRadius: '10px',
    backgroundColor: '#12161C',
    overflow: 'auto', 
  },
  rightColumn: {
    flex: 1,
    borderRadius: '10px',
    backgroundColor: '#12161C',
    overflow: 'auto',
  },
};

const SocialLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const post1 = {
    username: 'Uk_nown_User69',
    time: 'Hace 20 min',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    images: [
      'https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913_1280.jpg',
    ],
    likes: 20600,
    comments: 3400,
    shares: 100,
  };
  const post2 = {
    username: 'Uk_nown_User69',
    time: 'Hace 20 min',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    images: [
      'https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913_1280.jpg',
    ],
    likes: 20600,
    comments: 3400,
    shares: 100,
  };

  return (
    <div style={styles.appContainer}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`mainContainer ${isSidebarVisible ? 'showSidebar' : ''}`} style={styles.mainContainer}>
        <div className="sidebar" style={styles.sidebar}>
          <Sidebar />
        </div>
        <div className="mainContent" style={styles.mainContent}>
          <div className="subNavbar" style={styles.subNavbar}>
            <SubNavbar />
          </div>
          <div className="content" style={styles.content}>
            <div className="leftColumn" style={styles.leftColumn}>
              <DirectAccess />
              <NewsSection />
            </div>
            <div className="centerColumn" style={styles.centerColumn}>
              <CreatePublicationCard />
              <Outlet />
              <PostCard {...post1} />
              <PostCard {...post2} />
            </div>
            <div className="rightColumn" style={styles.rightColumn}>
              <AdsSection />
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLayout;
