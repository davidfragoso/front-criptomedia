import React, { useState, useEffect } from "react";
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
import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
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

  const [posts, setPosts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [tempImages, setTempImages] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  const handleCreatePost = (text, images) => {
    const newPost = {
      id: Date.now(), // Asegúrate de que cada post tenga un ID único
      username: "Nuevo Usuario",
      time: Date.now(), // Usar el tiempo actual en milisegundos
      content: text,
      images: Array.isArray(images) ? images : [],
      initialLikes: 0,
      comments: [],
      shares: 0,
    };
    console.log('Creando post con texto:', text);
    console.log('Creando post con imágenes:', images);
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (postId, updatedContent, updatedImages) => {
    console.log('Actualizando post con ID:', postId);
    console.log('Contenido actualizado:', updatedContent);
    console.log('Imágenes actualizadas:', updatedImages);

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, content: updatedContent, images: Array.isArray(updatedImages) ? updatedImages : [] }
          : post
      )
    );
  };

  const handleRepost = (postId, originalPostTime) => {
    const postToRepost = posts.find((post) => post.id === postId);
    if (postToRepost) {
      const newPost = {
        ...postToRepost,
        id: Date.now(), // Usar un nuevo ID
        username: "Nuevo Usuario",
        time: originalPostTime,
        repostedBy: "Nuevo Usuario",
        repostTime: Date.now(), // Tiempo del repost
      };
      setPosts([newPost, ...posts]);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setTempContent(postToEdit.content);
      setTempImages(Array.isArray(postToEdit.images) ? postToEdit.images : []);
      setEditingPostId(postId);
      setEditModalOpen(true);
    }
  };

  const handleEditSave = () => {
    if (!tempContent || !Array.isArray(tempImages)) {
      alert("El contenido o las imágenes no son válidos");
      return;
    }
    console.log('Actualizando post con ID:', editingPostId);
    console.log('Contenido actualizado:', tempContent);
    console.log('Imágenes actualizadas:', tempImages);

    handleUpdatePost(editingPostId, tempContent, tempImages);
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const handleImageRemove = (index) => {
    if (Array.isArray(tempImages) && tempImages.length > 0) {
      const newImages = tempImages.filter((_, i) => i !== index);
      setTempImages(newImages);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setTempImages([...tempImages, ...newImages]);
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
                  handleRepost={handleRepost}
                  handleEdit={handleEdit}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
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
        <Box sx={styles.modalContent}>
          <TextField
            fullWidth
            label="Editar contenido"
            multiline
            rows={4}
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            sx={styles.textField}
          />
          <Box sx={styles.imagePreview}>
            {Array.isArray(tempImages) && tempImages.map((image, index) => (
              <Box key={index} sx={styles.imageContainer}>
                <img src={image} alt={`edit-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  style={styles.removeButton}
                >
                  ×
                </button>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ bgcolor: 'secondary.main', color: '#FFF' }}
            >
              Agregar Imágenes
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={styles.imageInput}
              />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleEditCancel} variant="outlined" color="warning">Cancelar</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Guardar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const MainContent = ({
  posts,
  handleCreatePost,
  handleDeletePost,
  handleUpdatePost,
  handleRepost,
  handleEdit,
}) => {
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
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              {...post}
              onDeletePost={() => handleDeletePost(post.id)}
              onUpdatePost={handleUpdatePost}
              onRepost={handleRepost}
              onEdit={() => handleEdit(post.id)}
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
