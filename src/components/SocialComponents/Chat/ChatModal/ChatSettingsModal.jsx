import React from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import ReportIcon from "@mui/icons-material/Report";
import "../../../../css/ChatSettingsModal.css";

const ChatSettingsModal = ({ open, handleClose, chat }) => {
  if (!chat) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox">
        <IconButton className="closeButton" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Box className="chatTitle">
          <img src='../images/yop.jfif' className="largeAvatar" />
          <Box ml={2}>
            <Typography variant="h6">{chat.name}</Typography>
            <Typography variant="body2">@{chat.username}</Typography>
          </Box>
          <Box className="buttons">
            <Button variant="contained" color="error" className="button">
              <BlockIcon />
              Bloquear
            </Button>
            <Button variant="contained" color="primary" className="button">
              <ReportIcon />
              Reportar
            </Button>
          </Box>
        </Box>
        <Box className="bioSection">
          <Typography variant="h6">Biografía</Typography>
          <Typography variant="body2">
            Les mentí, soy un gato con acceso a internet y me gusta el mundo de
            criptomonedas.
          </Typography>
        </Box>
        <Box className="mediaSection">
          <Typography variant="h6">Multimedia</Typography>
          <Box className="mediaGallery">
            <img src="https://cdns-images.dzcdn.net/images/cover/03aec724767662a7461d5ea2a73af1d6/1900x1900-000000-80-0-0.jpg" alt="multimedia1" />
            <img src="https://pm1.aminoapps.com/7156/6dfcba3a22b5586843694bfa7f8177cb6087fdedr1-720-720v2_uhq.jpg" alt="multimedia2" />
            <img src="https://i.pinimg.com/474x/ed/14/97/ed1497018e0494cdda286296f41962c5.jpg" alt="multimedia3" />
            <img src="https://i.pinimg.com/474x/ed/14/97/ed1497018e0494cdda286296f41962c5.jpg" alt="multimedia3" />

          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatSettingsModal;
