import React from 'react';

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  },
};

const AdsSection = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://c8.alamy.com/comp/2F7N447/fryss-cocoa-and-chocolates-advert-about-1910-2F7N447.jpg"
        alt="Anuncio"
        style={styles.image}
      />
    </div>
  );
};

export default AdsSection;
