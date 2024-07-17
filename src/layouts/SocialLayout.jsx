import React from "react";
import { Routes, Route } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Modal, Backdrop, Button, TextField } from "@mui/material";
import Navbar from "../components/SocialComponents/Navbar/Navbar";
import Sidebar from "../components/SocialComponents/Sidebar/Sidebar";
import SubNavbar from "../components/SocialComponents/Navbar/SubNavbar";
import CreatePublicationCard from "../components/SocialComponents/Feed/CreatePublicationCard";
import PostCard from "../components/SocialComponents/Feed/PostCard";
import DirectAccess from "../components/SocialComponents/Feed/DirectAccess";
import NewsSection from "../components/SocialComponents/Feed/NewsSection";
import AdsSection from "../components/SocialComponents/Feed/AdsSection";
import ChatBox from "../components/SocialComponents/ChatBox/ChatBox";
import UserView from "../components/UserProfile/UserView";
import Profile from "../components/Profile/Profile";
import Chat from "../components/SocialComponents/Chat/Chat";
import usePosts from "../js/usePosts";
import CardsView from "../components/UserProfile/CardsView";
import "../css/SocialLayout.css"; // Importa el archivo CSS aquí
import "../App.css";
import Configuration from "../components/SocialComponents/Configuration/configuration";
import SavedPosts from "../components/SocialComponents/SavedPost/savedpost";
import CryptoTable from "../components/CriptoComponents/Index/CryptoIndex";


const SocialLayout = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 900px)");
  const {
    posts,
    editModalOpen,
    tempContent,
    tempImages,
    handleCreatePost,
    handleDeletePost,
    handleUpdatePost,
    handleRepost,
    handleEdit,
    handleEditSave,
    handleEditCancel,
    handleImageRemove,
    handleImageUpload,
    setTempContent,
  } = usePosts();

  return (
    <div className="appContainer">
      <Navbar />
      <div className={`mainContainer ${isTabletOrMobile ? 'tabletOrMobile' : ''}`}>
        {!isTabletOrMobile && <Sidebar />}
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<MainContent
              posts={posts}
              handleCreatePost={handleCreatePost}
              handleDeletePost={handleDeletePost}
              handleUpdatePost={handleUpdatePost}
              handleRepost={handleRepost}
              handleEdit={handleEdit} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userprofile" element={<UserView />} />
            <Route path="/cardsview" element={<CardsView />} />
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
                <img src={image} alt={`edit-${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                <Button
                  onClick={() => handleImageRemove(index)}
                  sx={{ position: "absolute", top: 0, right: 0, bgcolor: "error.main", color: "#fff", minWidth: "auto", p: 0.5 }}
                >
                  ×
                </Button>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" component="label" sx={{ bgcolor: "secondary.main", color: "#FFF" }}>
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
              <Button onClick={handleEditCancel} variant="outlined" color="warning" sx={{ mr: 2 }}>Cancelar</Button>
              <Button onClick={handleEditSave} variant="contained" color="primary">Guardar</Button>
            </Box>
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
      {!isMobile && <SubNavbar />}
      <div className="content">
        <div className="leftColumn">
          <DirectAccess />
          <NewsSection />
        </div>
        <div className="centerColumn">
          <CreatePublicationCard onCreatePost={handleCreatePost} />
          {posts.map((post) => (
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
        <div className="rightColumn">
          <AdsSection />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
