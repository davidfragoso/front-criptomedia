import React from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 10px 0 10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  time: {
    fontSize: '0.8rem',
    color: '#888888',
  },
};

const PostHeader = ({ username, time }) => {
  return (
    <div style={styles.header}>
      <img
        src="../images/yop.jfif"
        alt="User avatar"
        style={styles.avatar}
      />
      <div style={styles.userInfo}>
        <span style={styles.username}>{username}</span>
        <span style={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default PostHeader;
