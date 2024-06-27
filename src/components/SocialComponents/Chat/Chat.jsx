import React, { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDateHeader, formatTimestamp } from '../../../utils/utils';

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '250px',
        backgroundColor: '#1e1e1e',
        borderRadius: '10px 10px 0 0',
        padding: '10px',
        color: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '10px',
        borderBottom: '1px solid #27333E',
        cursor: 'pointer',
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
    closeButton: {
        cursor: 'pointer',
        color: '#ffffff',
    },
    messageList: {
        maxHeight: '400px',
        overflowY: 'auto',
    },
    messageItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #27333E',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    messageContent: {
        flex: 1,
    },
    username: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        marginBottom: '5px',
    },
    statusIndicator: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginRight: '5px',
    },
    online: {
        backgroundColor: 'green',
    },
    offline: {
        backgroundColor: 'orange',
    },
    messageText: {
        fontSize: '0.9rem',
        color: '#d1d1d1',
    },
    sendIcon: {
        cursor: 'pointer',
        color: '#ffffff',
    },
    dateHeader: {
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#ffffff',
        margin: '10px 0',
    },
    todayNotification: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: '#4caf50',
        color: '#ffffff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTodayNotification, setShowTodayNotification] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const todayMessages = messages.filter(msg => formatDateHeader(msg.timestamp) === 'Hoy');
        if (todayMessages.length > 0) {
            setShowTodayNotification(true);
            setTimeout(() => setShowTodayNotification(false), 3000);
        }
    }, []);

    const messages = [
        { username: 'David Fragoso', status: 'online', message: 'Lorem ipsum dolor sit amet, consectetur...', timestamp: Date.now() - 2000 },
        { username: 'Gael López', status: 'offline', message: 'Sed ut perspiciatis unde omnis iste natus error...', timestamp: Date.now() - 86400000 },
        { username: 'Marinela', status: 'online', message: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur...', timestamp: Date.now() - 172800000 },
        { username: 'Samanta', status: 'online', message: 'Duis aute irure dolor in reprehenderit in voluptate...', timestamp: Date.now() - 345600000 },
        { username: 'Felipe Ortíz', status: 'offline', message: 'Lorem ipsum dolor sit amet, consectetur...', timestamp: Date.now() - 604800000 },
    ];

    const groupedMessages = messages.reduce((groups, message) => {
        const dateHeader = formatDateHeader(message.timestamp);
        if (!groups[dateHeader]) {
            groups[dateHeader] = [];
        }
        groups[dateHeader].push(message);
        return groups;
    }, {});

    return (
        <div style={styles.container}>
            <div style={styles.header} onClick={toggleOpen}>
                <span style={styles.title}>Mensajes</span>
                {isOpen ? <ExpandMoreIcon style={styles.closeButton} /> : <ExpandLessIcon style={styles.closeButton} />}
            </div>
            {isOpen && (
                <div style={styles.messageList}>
                    {Object.keys(groupedMessages).map((dateHeader, index) => (
                        <React.Fragment key={index}>
                            <div style={styles.dateHeader}>{dateHeader}</div>
                            {groupedMessages[dateHeader].map((msg, idx) => (
                                <div key={idx} style={styles.messageItem}>
                                    <img src={`../images/yop.jfif`} alt="avatar" style={styles.avatar} />
                                    <div style={styles.messageContent}>
                                        <div style={styles.username}>{msg.username}</div>
                                        <div style={styles.status}>
                                            <div
                                                style={{
                                                    ...styles.statusIndicator,
                                                    ...(msg.status === 'online' ? styles.online : styles.offline),
                                                }}
                                            ></div>
                                            {msg.status === 'online' ? 'En línea' : 'Desconectado'}
                                        </div>
                                        <div style={styles.messageText}>{msg.message}</div>
                                        <div>{formatTimestamp(msg.timestamp)}</div>
                                    </div>
                                    <CloseIcon style={styles.sendIcon} />
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            )}
            {showTodayNotification && (
                <div style={styles.todayNotification}>
                    Tienes mensajes nuevos hoy
                </div>
            )}
        </div>
    );
};

export default ChatBox;