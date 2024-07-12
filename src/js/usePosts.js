import { useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [tempImages, setTempImages] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  const handleCreatePost = (text, images) => {
    const newPost = {
      id: Date.now(),
      username: "Nuevo Usuario",
      time: Date.now(),
      content: text,
      images: Array.isArray(images) ? images : [],
      initialLikes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (postId, updatedContent, updatedImages) => {
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
        id: Date.now(),
        username: "Nuevo Usuario",
        time: originalPostTime,
        repostedBy: "Nuevo Usuario",
        repostTime: Date.now(),
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
    handleUpdatePost(editingPostId, tempContent, tempImages);
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const handleImageRemove = (index) => {
    const newImages = tempImages.filter((_, i) => i !== index);
    setTempImages(newImages);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setTempImages([...tempImages, ...newImages]);
  };

  return {
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
  };
};

export default usePosts;
