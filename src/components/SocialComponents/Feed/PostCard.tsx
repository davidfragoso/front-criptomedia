import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CommentModal from './CommentModal/CommentModal';
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
    fontSize: '1.2rem',
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

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  liked: boolean;
  parentId: number | null;
  timestamp: number;
}

interface PostCardProps {
  username: string;
  time: string;
  content: string;
  images: string[];
  initialLikes: number;
  comments: number;
  shares: number;
}

const PostCard: React.FC<PostCardProps> = ({ username, time, content, images, initialLikes, comments, shares }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [open, setOpen] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([
    {
      id: 1,
      username: 'Uk_nown_User69',
      avatar: '../images/yop.jfif',
      text: 'Hola mundo, este es mi primer comentario dentro de esta publicación',
      likes: 2,
      liked: false,
      parentId: null,
      timestamp: Date.now(),
    },
    {
      id: 2,
      username: 'Uk_nown_User69',
      avatar: '../images/yop.jfif',
      text: 'Hola mundo, este es mi segundo comentario dentro de esta publicación',
      likes: 6000,
      liked: false,
      parentId: null,
      timestamp: Date.now(),
    },
    {
      id: 3,
      username: 'Uk_nown_User69',
      avatar: '../images/yop.jfif',
      text: 'Hola mundo, este es mi tercer comentario dentro de esta publicación',
      likes: 200,
      liked: false,
      parentId: null,
      timestamp: Date.now(),
    },
  ]);

  const [newCommentId, setNewCommentId] = useState<number | null>(null);

  const handleLikeClick = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommentLike = (commentId: number) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + (comment.liked ? -1 : 1), liked: !comment.liked };
        }
        return comment;
      });
    };

    setCommentList(prevComments => updateLikes(prevComments));
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: commentList.length + 1,
      username: 'Nuevo Usuario',
      avatar: '../images/yop.jfif',
      text,
      likes: 0,
      liked: false,
      parentId: null,
      timestamp: Date.now(),
    };
    setCommentList([...commentList, newComment]);
    setNewCommentId(newComment.id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'mil';
    }
    return num.toString();
  };

  const mainImageStyle = images.length > 1 
    ? { ...baseStyles.mainImage, maxWidth: '70%', borderRadius: '10px' } 
    : { ...baseStyles.mainImage, maxWidth: '100%',  borderRadius: '10px' };

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.header}>
        <img
          src="../images/yop.jfif"
          alt="User avatar"
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
      {images.length > 3 ? (
        <div style={{ position: 'relative' }}>
          <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} emulateTouch={true}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Post ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div style={baseStyles.imagesContainer}>
          <img src={images[0]} alt={`Post ${1}`} style={mainImageStyle} />
          {images.length > 1 && (
            <div style={baseStyles.smallImagesContainer}>
              {images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Post ${index + 2}`} style={baseStyles.smallImage} />
              ))}
            </div>
          )}
        </div>
      )}
      <div style={baseStyles.footer}>
        <div style={baseStyles.iconButton} onClick={handleLikeClick}>
          <FavoriteIcon style={{ color: liked ? 'red' : 'white' }} />
          <span style={baseStyles.iconText}>{formatNumber(likes)}</span>
        </div>
        <div style={baseStyles.iconButton} onClick={handleOpen}>
          <ChatBubbleIcon />
          <span style={baseStyles.iconText}>{formatNumber(comments)}</span>
        </div>
        <div style={baseStyles.iconButton}>
          <ShareIcon />
          <span style={baseStyles.iconText}>Compartir</span>
        </div>
      </div>
      <CommentModal 
        open={open} 
        handleClose={handleClose} 
        commentList={commentList} 
        handleCommentLike={handleCommentLike}
        handleAddComment={handleAddComment}
        newCommentId={newCommentId || undefined}
      />
    </div>
  );
};

export default PostCard;
