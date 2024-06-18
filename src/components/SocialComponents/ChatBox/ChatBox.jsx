import React, { useState } from "react";
import { CSSProperties } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: "250px",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px 10px 0 0",
    padding: "10px",
    color: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px",
    borderBottom: "1px solid #27333E",
    cursor: 'pointer',
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  closeButton: {
    cursor: "pointer",
    color: "#ffffff",
  },
  messageList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  messageItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #27333E",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  messageContent: {
    flex: 1,
  },
  username: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  status: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    marginBottom: "5px",
  },
  statusIndicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "5px",
  },
  online: {
    backgroundColor: "green",
  },
  offline: {
    backgroundColor: "orange",
  },
  messageText: {
    fontSize: "0.9rem",
    color: "#d1d1d1",
  },
  sendIcon: {
    cursor: "pointer",
    color: "#ffffff",
  },
};

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const messages = [
    {
      username: "David Fragoso",
      status: "online",
      message: "Lorem ipsum dolor sit amet, consectetur...",
    },
    {
      username: "Gael López",
      status: "offline",
      message: "Sed ut perspiciatis unde omnis iste natus error...",
    },
    {
      username: "Marinela",
      status: "online",
      message: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur...",
    },
    {
      username: "Samanta",
      status: "online",
      message: "Duis aute irure dolor in reprehenderit in voluptate...",
    },
    {
      username: "Felipe Ortíz",
      status: "offline",
      message: "Lorem ipsum dolor sit amet, consectetur...",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={toggleOpen}>
        <span style={styles.title}>Mensajes</span>
        {isOpen ? <ExpandMoreIcon style={styles.closeButton} /> : <ExpandLessIcon style={styles.closeButton} />}
      </div>
      {isOpen && (
        <div style={styles.messageList}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.messageItem}>
              <img
                src={`../images/yop.jfif`}
                alt="avatar"
                style={styles.avatar}
              />
              <div style={styles.messageContent}>
                <div style={styles.username}>{msg.username}</div>
                <div style={styles.status}>
                  <div
                    style={{
                      ...styles.statusIndicator,
                      ...(msg.status === "online"
                        ? styles.online
                        : styles.offline),
                    }}
                  ></div>
                  {msg.status === "online" ? "En línea" : "Desconectado"}
                </div>
                <div style={styles.messageText}>{msg.message}</div>
              </div>
              <CloseIcon style={styles.sendIcon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
