import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const styles = {
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
  mainImageFull: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  mainImage: {
    width: '70%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  smallImagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '30%',
    height: '400px',
    borderRadius: '10px',
  },
  smallImage: {
    width: '100%',
    height: 'calc(50% - 5px)',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
};

const PostImages = ({ images, handleImageClick }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div style={styles.imagesContainer}>
      {images.length > 3 ? (
        <div style={{ position: 'relative', width: '100%' }}>
          <Carousel showArrows showThumbs={false} showStatus={false} infiniteLoop emulateTouch>
            {images.map((image, index) => (
              <div key={index} onClick={() => handleImageClick(image)}>
                <img src={image} alt={`Post ${index + 1}`} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '10px' }} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        images.length === 1 ? (
          <img src={images[0]} alt={`Post ${1}`} style={styles.mainImageFull} onClick={() => handleImageClick(images[0])} />
        ) : (
          <>
            <img src={images[0]} alt={`Post ${1}`} style={styles.mainImage} onClick={() => handleImageClick(images[0])} />
            <div style={styles.smallImagesContainer}>
              {images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Post ${index + 2}`} style={styles.smallImage} onClick={() => handleImageClick(image)} />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PostImages;
