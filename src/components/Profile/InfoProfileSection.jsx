import React, { useState, useRef, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, Modal, Backdrop, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';

const ProfileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#12161C',
  color: '#ffffff',
  borderRadius: '10px 10px 0 0',
  padding: theme.spacing(4),
  textAlign: 'start',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(4),
  overflow: 'auto',
  position: 'relative',
  borderTop: '2px solid #27333E',
  borderRight: '2px solid #27333E',
  borderLeft: '2px solid #27333E',
}));

const HeaderImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  borderRadius: '10px 10px 0 0',
  overflow: 'hidden',
}));

const HeaderImage = styled(Box)(({ src, posX, posY, scale }) => ({
  width: '100%',
  height: '100%',
  background: `url(${src}) no-repeat`,
  backgroundPosition: `${posX}% ${posY}%`,
  backgroundSize: `${scale}%`,
  borderRadius: '10px 10px 0 0',
  cursor: 'move',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  marginBottom: '-60px',
  border: '4px solid #12161C',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  position: 'absolute',
  top: '160px',
  left: '5%',
}));

const CameraIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '250px',
  left: '150px',
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#ff8a00',
  },
}));

const HeaderCameraIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '150px',
  right: '10px',
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#ff8a00',
  },
}));

const EditProfileIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '250px',
  right: '25px',
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#ff8a00',
  },
}));

const InfoProfileSection = () => {
  const [avatarSrc, setAvatarSrc] = useState('../images/yop.jfif');
  const [headerImageSrc, setHeaderImageSrc] = useState('https://blog.bitso.com/wp-content/uploads/2023/03/o-que-e-bitcoin-scaled.jpg');
  const [tempHeaderImageSrc, setTempHeaderImageSrc] = useState(headerImageSrc);
  const [posX, setPosX] = useState(50); // X position in percentage
  const [posY, setPosY] = useState(50); // Y position in percentage
  const [scale, setScale] = useState(100); // Scale in percentage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempPosX, setTempPosX] = useState(posX);
  const [tempPosY, setTempPosY] = useState(posY);
  const [tempScale, setTempScale] = useState(scale);
  const [name, setName] = useState('Plipps');
  const [bio, setBio] = useState('Les mentí, soy un gato con acceso a internet y me gusta el mundo de criptomonedas.');
  const [website, setWebsite] = useState('www.criptocats.com');
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);
  const [tempWebsite, setTempWebsite] = useState(website);

  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempHeaderImageSrc(e.target.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    const newPosX = Math.min(100, Math.max(0, tempPosX + dx / 2));
    const newPosY = Math.min(100, Math.max(0, tempPosY + dy / 2));

    setTempPosX(newPosX);
    setTempPosY(newPosY);

    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const container = containerRef.current;
    const image = imageRef.current;

    if (container && image) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const imageWidth = image.offsetWidth;
      const imageHeight = image.offsetHeight;

      const minScale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight) * 100;
      const newScale = Math.max(minScale, tempScale - e.deltaY / 10);
      setTempScale(newScale);
    }
  };

  const handleSave = () => {
    setHeaderImageSrc(tempHeaderImageSrc);
    setPosX(tempPosX);
    setPosY(tempPosY);
    setScale(tempScale);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempHeaderImageSrc(headerImageSrc);
    setTempPosX(posX);
    setTempPosY(posY);
    setTempScale(scale);
    setIsModalOpen(false);
  };

  const handleEditSave = () => {
    setName(tempName);
    setBio(tempBio);
    setWebsite(tempWebsite);
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setTempName(name);
    setTempBio(bio);
    setTempWebsite(website);
    setIsEditModalOpen(false);
  };

  return (
    <ProfileContainer>
      <HeaderImageContainer ref={containerRef}>
        <HeaderImage src={headerImageSrc} posX={posX} posY={posY} scale={scale} ref={imageRef} />
        <Tooltip title="Cambiar imagen de encabezado">
          <HeaderCameraIconButton component="label">
            <PhotoCameraIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleHeaderImageChange}
            />
          </HeaderCameraIconButton>
        </Tooltip>
      </HeaderImageContainer>
      <ProfileAvatar src={avatarSrc} alt="David Fragoso" />
      <Tooltip title="Cambiar foto de perfil">
        <CameraIconButton component="label">
          <PhotoCameraIcon />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </CameraIconButton>
      </Tooltip>
      <Tooltip title="Editar perfil">
        <EditProfileIconButton onClick={() => setIsEditModalOpen(true)}>
          <EditIcon />
        </EditProfileIconButton>
      </Tooltip>
      <Box mt={10}>
        <Typography variant="h5" gutterBottom>{name}</Typography>
        <Typography variant="body2" color="#27333E">@Plopps45</Typography>
        <Box mt={2}>
          <Typography variant="body1">{bio}</Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="body2" color="#FF8A00">{website}</Typography>
        </Box>
        <Box display="flex" justifyContent="start" mt={2}>
          <Box mx={2}>
            <Typography variant="body1">23</Typography>
            <Typography variant="body2" color="#27333E">Siguiendo</Typography>
          </Box>
          <Box mx={2}>
            <Typography variant="body1">450</Typography>
            <Typography variant="body2" color="#27333E">Seguidores</Typography>
          </Box>
        </Box>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: '#12161C',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <HeaderImageContainer
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <HeaderImage src={tempHeaderImageSrc} posX={tempPosX} posY={tempPosY} scale={tempScale} ref={imageRef} />
          </HeaderImageContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleCancel} variant="outlined" color="warning">Cancelar</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Guardar</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={handleEditCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: '#12161C',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: '10px',
            color: '#FFF',
          }}
        >
          <Typography variant="h6" gutterBottom>Editar perfil</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: '#FFF' },
            }}
            InputProps={{
              style: { color: '#FFF', backgroundColor: '#1e1e1e' },
            }}
          />
          <TextField
            label="Biografía"
            fullWidth
            multiline
            rows={4}
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: '#FFF' },
            }}
            InputProps={{
              style: { color: '#FFF', backgroundColor: '#1e1e1e' },
            }}
          />
          <TextField
            label="Sitio web"
            fullWidth
            value={tempWebsite}
            onChange={(e) => setTempWebsite(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: '#FFF' },
            }}
            InputProps={{
              style: { color: '#FFF', backgroundColor: '#1e1e1e' },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleEditCancel} variant="outlined" color="warning">Cancelar</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Guardar</Button>
          </Box>
        </Box>
      </Modal>
    </ProfileContainer>
  );
};

export default InfoProfileSection;
