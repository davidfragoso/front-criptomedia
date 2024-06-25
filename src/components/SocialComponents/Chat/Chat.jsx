import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  TextField,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

const styles = {
  container: {
    position: "relative",
    height: "100%",
    backgroundColor: "#12161C",
    borderRadius: "10px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  messageList: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    maxHeight: "calc(95vh - 180px)", 
  },
  messageItem: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: "20px",
    backgroundColor: "#D37E19",
    color: "white",
    marginBottom: "5px",
    wordWrap: "break-word",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  messageBubbleReceived: {
    backgroundColor: "#262626",
    alignSelf: "flex-start",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  messageBubbleSent: {
    alignSelf: "flex-end",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #27333E",
    backgroundColor: "#1e1e1e",
  },
  inputField: {
    flex: 1,
    marginRight: "10px",
    borderRadius: "20px",
    backgroundColor: "white",
  },
  sendButton: {
    borderRadius: "50%",
    minWidth: "40px",
    height: "40px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
  },
};

const initialChats = [
  {
    id: 1,
    name: "David Fragoso",
    unread: 5,
    messages: [
      { text: "Hola, ¿cómo estás?", sender: "other" },
      { text: "¿Vamos a la reunión mañana?", sender: "me" },
    ],
  },
  {
    id: 2,
    name: "Gael López",
    unread: 2,
    messages: [
      { text: "Nuevo proyecto en camino", sender: "other" },
      { text: "Necesito tu opinión aquí", sender: "me" },
    ],
  },
  {
    id: 3,
    name: "Marinela",
    unread: 0,
    messages: [
      { text: "Gracias por tu ayuda con el informe", sender: "other" },
    ],
  },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [chats, setChats] = useState(initialChats);
  const messageListRef = useRef(null);

  const selectChat = (chatId) => {
    setSelectedChat(chatId);
  };

  const sendMessage = () => {
    if (messageText.trim() && selectedChat !== null) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, { text: messageText, sender: "me" }],
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

  return (
    <Box display="flex" height="100vh">
      <Box width="70%" p={2} style={styles.container}>
        <Typography
          variant="h6"
          style={{ color: "white", paddingBottom: "10px" }}
        >
          Chat con{" "}
          {selectedChat
            ? chats.find((c) => c.id === selectedChat).name
            : "..."}
        </Typography>
        <div style={styles.messageList} ref={messageListRef}>
          {selectedChat ? (
            chats
              .find((chat) => chat.id === selectedChat)
              .messages.map((message, index) => (
                <div key={index} style={styles.messageItem}>
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...(message.sender === "me"
                        ? styles.messageBubbleSent
                        : styles.messageBubbleReceived),
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))
          ) : (
            <Typography style={{ color: "#ffffff" }}>
              Seleccione un chat para ver los mensajes
            </Typography>
          )}
          <div ref={messageListRef} />
        </div>
        <Box style={styles.inputArea}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escribe un mensaje..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={styles.inputField}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <IconButton
            color="primary"
            onClick={sendMessage}
            style={styles.sendButton}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
      <Box width="30%" bgcolor="#12161C" borderLeft="2px solid #27333E" p={2}>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} button onClick={() => selectChat(chat.id)}>
              <ListItemAvatar>
                <Avatar>
                  <ChatIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={chat.name} />
              {chat.unread > 0 && (
                <Badge badgeContent={chat.unread} color="primary" />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Chat;
