import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Modal, Backdrop, Button, TextField } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SubNavbar from "../components/Navbar/SubNavbar";
import CreatePublicationCard from "../components/SocialComponents/Feed/CreatePublicationCard";
import PostCard from "../components/SocialComponents/Feed/PostCard";
import DirectAccess from "../components/SocialComponents/Feed/DirectAccess";
import NewsSection from "../components/SocialComponents/Feed/NewsSection";
import AdsSection from "../components/SocialComponents/Feed/AdsSection";
import ChatBox from "../components/SocialComponents/ChatBox/ChatBox";
import UserView from "../components/UserProfile/UserView";
import FollowersView from "../components/UserProfile/FollowersView";
import Profile from "../components/Profile/Profile";
import Chat from "../components/SocialComponents/Chat/Chat";
import axios from 'axios';
import "../css/SocialLayout.css";
import "../App.css";
import Configuration from "../components/SocialComponents/Configuration/configuration";
import SavedPosts from "../components/SocialComponents/SavedPost/savedpost";
import FollowersModal from "../components/SocialComponents/Feed/FollowersModal/FollowersModal";
import CreatePostModal from "../components/SocialComponents/Feed/CreatePostModal/CreatePostModal";

const SocialLayout = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempContent, setTempContent] = useState('');
  const [tempImages, setTempImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching posts and users data...");
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://coinversesocialapi.azurewebsites.net/api/Posts'),
          axios.get('https://coinversesocialapi.azurewebsites.net/api/Users'),
        ]);
        console.log("Posts data:", postsResponse.data);
        console.log("Users data:", usersResponse.data);
        
        const sortedPosts = postsResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(sortedPosts);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`https://coinversesocialapi.azurewebsites.net/api/Posts/${postId}`);
      setPosts(posts.filter(post => post.pkPost !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async (postId, updatedContent, updatedImages) => {
    try {
      const response = await axios.put(`https://coinversesocialapi.azurewebsites.net/api/Posts/${postId}`, {
        text: updatedContent,
        images: updatedImages
      });
      setPosts(posts.map(post => post.pkPost === postId ? response.data : post).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleRepost = async (postId, time) => {
    try {
      const response = await axios.post('https://coinversesocialapi.azurewebsites.net/api/Posts', {
        pkPost: 0,
        fkUser: localStorage.getItem('LoggedUser'),
        fkTypePost: 2, 
        text: '',
        idPostShared: postId,
        date: new Date().toISOString()
      });
      setPosts([response.data, ...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Error reposting:', error);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find(post => post.pkPost === postId);
    if (postToEdit) {
      setTempContent(postToEdit.text);
      setTempImages(postToEdit.images || []);
      setEditModalOpen(true);
    }
  };

  const handleEditSave = () => {
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const handleImageRemove = (index) => {
    setTempImages(tempImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setTempImages([...tempImages, ...newImages]);
  };

  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [followers, setFollowers] = useState([
    { id: 1, name: 'David Fragoso', avatar: '../images/yop.jfif' },
    { id: 2, name: 'Gael López', avatar: '../images/yop.jfif' },
    { id: 3, name: 'Marinela', avatar: '../images/yop.jfif' },
  ]);

  const handleOpenFollowersModal = () => setFollowersModalOpen(true);
  const handleCloseFollowersModal = () => setFollowersModalOpen(false);

  const handleOpenCreatePostModal = () => setCreatePostModalOpen(true);
  const handleCloseCreatePostModal = () => setCreatePostModalOpen(false);

  const showNavbar = !(isTabletOrMobile && location.pathname === "/chats");
  const noSidebar = isTabletOrMobile;

  return (
    <div className="appContainer">
      {showNavbar && <Navbar layoutType="social" />}
      <div className={`mainContainer ${isTabletOrMobile ? "tabletOrMobile" : ""} ${!showNavbar ? "noNavbar" : ""}`}>
        {!isTabletOrMobile && <Sidebar layoutType="social" />}
        <div className={`mainContent ${noSidebar ? "noSidebar" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  posts={posts}
                  users={users}
                  handleCreatePost={handleCreatePost}
                  handleDeletePost={handleDeletePost}
                  handleUpdatePost={handleUpdatePost}
                  handleRepost={handleRepost}
                  handleEdit={handleEdit}
                  onOpenCreatePostModal={handleOpenCreatePostModal}
                  onOpenFollowersModal={handleOpenFollowersModal}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cardsview" element={<FollowersView />} />
            <Route path="/userprofile" element={<UserView />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/settings" element={<Configuration />} />
            <Route path="/saved" element={<SavedPosts />} />
          </Routes>
        </div>
      </div>
      <Modal
        open={editModalOpen}
        onClose={handleEditCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box className="modalContent">
          <TextField
            fullWidth
            label="Editar contenido"
            multiline
            rows={4}
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tempImages.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={image}
                  alt={`edit-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  onClick={() => handleImageRemove(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "error.main",
                    color: "#fff",
                    minWidth: "auto",
                    p: 0.5,
                  }}
                >
                  ×
                </Button>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ bgcolor: "secondary.main", color: "#FFF" }}
            >
              Agregar Imágenes
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Box>
              <Button
                onClick={handleEditCancel}
                variant="outlined"
                color="warning"
                sx={{ mr: 2 }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditSave}
                variant="contained"
                color="primary"
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <FollowersModal open={isFollowersModalOpen} onClose={handleCloseFollowersModal} followers={followers} />
      <CreatePostModal open={isCreatePostModalOpen} onClose={handleCloseCreatePostModal} onCreatePost={handleCreatePost} />
    </div>
  );
};

const MainContent = ({
  posts,
  users,
  handleCreatePost,
  handleDeletePost,
  handleUpdatePost,
  handleRepost,
  handleEdit,
  onOpenCreatePostModal,
  onOpenFollowersModal,
}) => {
  const isMobile = useMediaQuery("(max-width: 400px)");

  return (
    <>
      {!isMobile && <SubNavbar />}
      <div className="content">
        <div className="leftColumn">
          <DirectAccess onOpenCreatePostModal={onOpenCreatePostModal} onOpenFollowersModal={onOpenFollowersModal} />
          <NewsSection />
        </div>
        <div className="centerColumn">
          <CreatePublicationCard onCreatePost={handleCreatePost} />
          {posts.map((post) => {
            const user = users.find(user => user.pkUser === post.fkUser);
            const username = user ? user.fullName : "Usuario desconocido";

            return (
              <PostCard
                key={post.pkPost}
                id={post.pkPost}
                time={post.date}
                content={post.text}
                images={post.images} 
                initialLikes={post.likes}
                comments={post.comments} 
                shares={post.shares}
                username={username} 
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
                onRepost={handleRepost}
                onEdit={handleEdit}
              />
            );
          })}
        </div>
        <div className="rightColumn">
          <AdsSection />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
