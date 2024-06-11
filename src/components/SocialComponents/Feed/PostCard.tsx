import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CSSProperties } from 'react';

const baseStyles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    color: '#ffffff',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 10px 0 10px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  username: {
    fontSize: '1rem',
    fontWeight: 'bold' as 'bold',
  },
  time: {
    fontSize: '0.8rem',
    color: '#888888',
  },
  content: {
    marginBottom: '10px',
  },
  text: {
    fontSize: '0.9rem',
    color: '#d1d1d1',
    padding: '0 10px 0 10px'

  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    gap: '5px',
  },
  smallImagesContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
    flex: '1 1 40%',
  },
  smallImage: {
    width: '100%',
    height: 'calc(50% - 5px)', 
    borderRadius: '10px',
    objectFit: 'cover' as 'cover',
    maxWidth: '100%', 
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10px',
    borderTop: '1px solid #27333E',
    padding: '10px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },
  iconText: {
    marginLeft: '5px',
    fontSize: '0.8rem',
  },
};

interface PostCardProps {
  username: string;
  time: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
}

const PostCard: React.FC<PostCardProps> = ({ username, time, content, images, likes, comments, shares }) => {
  const mainImageStyle = images.length > 1 
    ? { ...baseStyles.mainImage, maxWidth: '70%', borderRadius: '10px' } 
    : { ...baseStyles.mainImage, maxWidth: '100%',  borderRadius: '10px' };

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.header}>
        <img
          src="../images/yop.jfif"
          alt="avatar"
          style={baseStyles.avatar}
        />
        <div style={baseStyles.userInfo}>
          <span style={baseStyles.username}>{username}</span>
          <span style={baseStyles.time}>{time}</span>
        </div>
        <MoreVertIcon style={{ marginLeft: 'auto', color: '#888888' }} />
      </div>
      <div style={baseStyles.content}>
        <p style={baseStyles.text}>{content} <span style={{color: '#ff8a00'}}>Ver más</span></p>
      </div>
      <div style={baseStyles.imagesContainer}>
        <img src={images[0]} alt="post image" style={mainImageStyle} />
        {images.length > 1 && (
          <div style={baseStyles.smallImagesContainer}>
            {images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`post image ${index + 1}`} style={baseStyles.smallImage} />
            ))}
          </div>
        )}
      </div>
      <div style={baseStyles.footer}>
        <div style={baseStyles.iconButton}>
          <FavoriteIcon />
          <span style={baseStyles.iconText}>{likes}</span>
        </div>
        <div style={baseStyles.iconButton}>
          <ChatBubbleIcon />
          <span style={baseStyles.iconText}>{comments}</span>
        </div>
        <div style={baseStyles.iconButton}>
          <ShareIcon />
          <span style={baseStyles.iconText}>Compartir</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
