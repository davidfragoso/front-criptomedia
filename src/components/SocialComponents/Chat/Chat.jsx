import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../../Navbar/Navbar";
import ChatList from "./ChatList";
import ChatSettingsModal from "./ChatModal/ChatSettingsModal";
import { formatTimestamp } from "../../../utils/utils";
import "../../../css/Chat.css";

const initialChats = [
  {
    id: 1,
    name: "David Fragoso",
    avatar: "../images/DPP.png",
    messages: [
      {
        text: "Hola, ¿cómo estás?",
        sender: "other",
        timestamp: Date.now() - 10000,
        status: "read",
      },
      {
        text: "¿Vamos a la reunión mañana?",
        sender: "me",
        timestamp: Date.now() - 5000,
        status: "read",
      },
    ],
  },
  {
    id: 2,
    name: "Gael López",
    avatar: "../images/DPP.png",
    messages: [
      {
        text: "Nuevo proyecto en camino",
        sender: "other",
        timestamp: Date.now() - 10000,
        status: "read",
      },
      {
        text: "Necesito tu opinión aquí",
        sender: "me",
        timestamp: Date.now() - 5000,
        status: "pending",
      },
    ],
  },
  {
    id: 3,
    name: "Marinela",
    avatar: "../images/DPP.png",
    unread: 1,
    messages: [
      {
        text: "Gracias por tu ayuda con el informe",
        sender: "other",
        timestamp: Date.now() - 10000,
        status: "pending",
      },
    ],
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <AccessTimeIcon className="statusIcon" />;
    case "delivered":
      return <CheckIcon className="statusIcon" />;
    case "read":
      return <VisibilityIcon className="statusIcon" />;
    default:
      return null;
  }
};

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const messageListRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const selectChat = (chatId) => {
    setSelectedChat(chatId);

    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        const updatedMessages = chat.messages.map((message) =>
          message.sender === "other" ? { ...message, status: "read" } : message
        );
        return { ...chat, messages: updatedMessages, unread: 0, selected: true };
      }
      return { ...chat, selected: false };
    });
    setChats(updatedChats);
  };

  const sendMessage = () => {
    if (messageText.trim() && selectedChat !== null) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                text: messageText,
                sender: "me",
                timestamp: Date.now(),
                status: "pending",
              },
            ],
            selected: true,
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setMessageText("");
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chats, selectedChat]);

  const countNewMessages = (messages) => {
    return messages.filter((message) => message.sender === "other" && message.status !== "read").length;
  };

  const handleOpenSettings = () => {
    setOpenSettingsModal(true);
  };

  const handleCloseSettings = () => {
    setOpenSettingsModal(false);
  };

  const selectedChatDetails = chats.find((chat) => chat.id === selectedChat);

  return (
    <Box display="flex" height="100vh">
      {isMobile && selectedChat === null && <Navbar />}
      {isMobile && selectedChat === null ? (
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          selectChat={selectChat}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isMobile={isMobile}
        />
      ) : (
        <Box
          width={isMobile ? "100%" : "60%"}
          p={2}
          className={`container ${isMobile && selectedChat === null ? "fullHeight" : ""}`}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {isMobile && (
              <IconButton onClick={() => setSelectedChat(null)} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" style={{ color: "white" }}>
              {selectedChatDetails?.name || "Selecciona un chat"}
            </Typography>
            <IconButton onClick={handleOpenSettings} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Box>
          <div className="messageList" ref={messageListRef}>
            {selectedChat ? (
              <>
                {countNewMessages(selectedChatDetails?.messages || []) > 0 && (
                  <Divider style={{ color: "#D37E19", padding: "10px 0" }}>
                    {countNewMessages(selectedChatDetails?.messages || [])}{" "}
                    Nuevo(s)
                  </Divider>
                )}
                {selectedChatDetails?.messages.map((message, index) => (
                  <div key={index} className="messageItem">
                    <div
                      className={`messageBubble ${
                        message.sender === "me"
                          ? `messageBubbleSent ${isMobile ? 'mobile' : ''}`
                          : `messageBubbleReceived ${isMobile ? 'mobile' : ''}`
                      }`}
                    >
                      {message.text}
                      <div className="timestamp">
                        {formatTimestamp(message.timestamp)}
                        {message.sender === "me" &&
                          getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Typography style={{ color: "#fff" }}>
                Seleccione un chat para ver los mensajes
              </Typography>
            )}
            <div ref={messageListRef} />
          </div>
          {selectedChat && (
            <Box className="inputArea">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Escribe un mensaje..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="inputField"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <IconButton
                color="primary"
                onClick={sendMessage}
                className="sendButton"
              >
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
      {!isMobile && (
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          selectChat={selectChat}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isMobile={isMobile}
        />
      )}
      <ChatSettingsModal
        open={openSettingsModal}
        handleClose={handleCloseSettings}
        chat={selectedChatDetails}
      />
    </Box>
  );
};

export default Chat;
