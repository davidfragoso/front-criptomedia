import React from 'react';

const styles = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    padding: '20px',
    color: '#ffffff',
    marginTop: '20px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  post: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
};

const NewsSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Posts populares</div>
      <div style={styles.post}>
        <img src="https://cdn.pixabay.com/photo/2017/01/25/12/31/bitcoin-2007769_1280.jpg" alt="News 1" style={styles.image} />
        <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
      </div>
      <div style={styles.post}>
        <img src="https://cdn.pixabay.com/photo/2017/09/08/21/20/bitcoin-2730220_1280.jpg" alt="News 2" style={styles.image} />
        <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
      </div>
      <div style={styles.post}>
        <img src="https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913_1280.jpg" alt="News 3" style={styles.image} />
        <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
      </div>
    </div>
  );
};

export default NewsSection;
