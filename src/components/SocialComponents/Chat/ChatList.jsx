import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Divider,
  Paper,
  InputBase,
  Box,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { formatTimestamp } from "../../../utils/utils";
import "../../../css/Chat.css";

const getLastMessage = (messages) => {
  if (messages.length === 0) return "";
  return messages[messages.length - 1];
};

const truncateMessage = (message, maxLength) => {
  if (message.length <= maxLength) return message;
  return `${message.substring(0, maxLength)}...`;
};

const countNewMessages = (messages) => {
  return messages.filter((message) => message.sender === "other" && message.status !== "read").length;
};

const ChatList = ({ chats, selectedChat, selectChat, searchTerm, setSearchTerm }) => {
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="30%"
      bgcolor="#1E2024"
      borderLeft="2px solid #27333E"
      color="#fff"
      p={2}
      className="chatListContainer"
    >
      <Paper className="searchContainer">
        <SearchIcon className="searchIcon" />
        <InputBase
          placeholder="Buscar chats..."
          inputProps={{ "aria-label": "buscar chats" }}
          className="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <Divider className="chatListDivider" />
      <List>
        {filteredChats.map((chat) => {
          const lastMessage = getLastMessage(chat.messages);
          const isUnread = chat.unread > 0;
          const isSelected = selectedChat === chat.id;
          const newMessages = countNewMessages(chat.messages);
          const timestampColor =
            isSelected || !isUnread ? "listItemTimestampSelected" : "listItemTimestamp";

          return (
            <React.Fragment key={chat.id}>
              <ListItem
                button
                onClick={() => selectChat(chat.id)}
                className={`listItem ${isSelected ? "listItemSelected" : ""}`}
                selected={isSelected}
              >
                <ListItemAvatar>
                  <Avatar src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={
                    <Box component="span" className="listItemTextSecondaryContainer">
                      <Typography
                        component="span"
                        className="listItemTextSecondary"
                        style={{
                          fontWeight:
                            lastMessage?.sender === "other" &&
                            lastMessage?.status !== "read"
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {lastMessage
                          ? truncateMessage(lastMessage.text, 30)
                          : ""}
                      </Typography>
                      <Typography component="span" className={timestampColor}>
                        {lastMessage
                          ? formatTimestamp(lastMessage.timestamp)
                          : ""}
                      </Typography>
                    </Box>
                  }
                  primaryTypographyProps={{ className: "listItemTextPrimary" }}
                />
                {isUnread && (
                  <Badge badgeContent={chat.unread} color="warning" />
                )}
              </ListItem>
              <Divider className="chatListDivider" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default ChatList;
