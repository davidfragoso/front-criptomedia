import React, { useState } from 'react';

const styles = {
  content: {
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#d1d1d1',
    padding: '0 10px 0 10px',
  },
};

const PostContent = ({ content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // Mueve la validación fuera del hook
  if (typeof content !== 'string') {
    return null;
  }

  const handleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div style={styles.content}>
      <p style={styles.text}>
        {showFullContent ? content : content.slice(0, 500)}
        {content.length > 500 && (
          <span
            style={{ color: '#ff8a00', cursor: 'pointer' }}
            onClick={handleShowFullContent}
          >
            {showFullContent ? ' Ver menos' : ' Ver más'}
          </span>
        )}
      </p>
    </div>
  );
};

export default PostContent;
