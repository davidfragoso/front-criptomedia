import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/SocialComponents/Navbar/Navbar";
import SubNavbar from "../components/SocialComponents/Navbar/SubNavbar";
import Sidebar from "../components/SocialComponents/Sidebar/Sidebar";
import CreatePublicationCard from "../components/SocialComponents/Feed/CreatePublicationCard";
import PostCard from "../components/SocialComponents/Feed/PostCard";
import DirectAccess from "../components/SocialComponents/Feed/DirectAccess";
import NewsSection from "../components/SocialComponents/Feed/NewsSection";
import AdsSection from "../components/SocialComponents/Feed/AdsSection";
import ChatBox from "../components/SocialComponents/ChatBox/ChatBox";
import Profile from "../components/Profile/Profile";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../App.css";

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1e1e1e",
    overflow: "hidden",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    marginTop: "60px",
    width: "100%",
    overflow: "hidden",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "calc(100% - 240px)",
    overflow: "hidden",
  },
  subNavbar: {
    width: "100%",
    marginTop: "8px",
    zIndex: 999,
    backgroundColor: "#12161C",
    borderBottom: "2px solid #27333E",
  },
  content: {
    flexGrow: 1,
    padding: "10px",
    backgroundColor: "#12161C",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflowY: "auto",
  },
  leftColumn: {
    flex: 1,
    marginRight: "10px",
    borderRadius: "10px",
    backgroundColor: "#12161C",
    overflow: "auto",
  },
  centerColumn: {
    flex: 3,
    borderRadius: "10px",
    backgroundColor: "#12161C",
    overflowY: "auto",
  },
  rightColumn: {
    flex: 1,
    borderRadius: "10px",
    backgroundColor: "#12161C",
    overflow: "auto",
    marginLeft: "10px",
  },
};

const SocialLayout = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 400px)");
  const navigate = useNavigate();

  const handleShowProfile = () => {
    navigate("/profile");
  };

  const [posts, setPosts] = React.useState([]);

  const handleCreatePost = (text, images) => {
    const newPost = {
      id: Date.now(), // Usar el tiempo actual en milisegundos como id
      username: "Nuevo Usuario",
      time: Date.now(),
      content: text,
      images: images,
      initialLikes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleUpdatePost = (postId, updatedContent) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, content: updatedContent } : post));
  };

  return (
    <div style={styles.appContainer}>
      <Navbar onShowProfile={handleShowProfile} />
      <div
        className="mainContainer"
        style={{
          ...styles.mainContainer,
          ...(isTabletOrMobile && { marginLeft: 0, width: "100%" }),
        }}
      >
        {!isTabletOrMobile && (
          <div className="sidebar" style={styles.sidebar}>
            <Sidebar />
          </div>
        )}
        <div
          className="mainContent"
          style={{
            ...styles.mainContent,
            ...(isTabletOrMobile && { marginLeft: 0, width: "100%" }),
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  posts={posts}
                  handleCreatePost={handleCreatePost}
                  handleDeletePost={handleDeletePost}
                  handleUpdatePost={handleUpdatePost}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ posts, handleCreatePost, handleDeletePost, handleUpdatePost }) => {
  const isMobile = useMediaQuery("(max-width: 400px)");

  return (
    <>
      {!isMobile && (
        <div className="subNavbar" style={styles.subNavbar}>
          <SubNavbar />
        </div>
      )}
      <div className="content" style={styles.content}>
        <div className="leftColumn" style={styles.leftColumn}>
          <DirectAccess />
          <NewsSection />
        </div>
        <div className="centerColumn" style={styles.centerColumn}>
          <CreatePublicationCard onCreatePost={handleCreatePost} />
          {posts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              onDeletePost={() => handleDeletePost(post.id)}
              onUpdatePost={(updatedContent) =>
                handleUpdatePost(post.id, updatedContent)
              }
            />
          ))}
        </div>
        <div className="rightColumn" style={styles.rightColumn}>
          <AdsSection />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
