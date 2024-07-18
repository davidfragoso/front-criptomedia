import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', 
    },
    secondary: {
      main: '#005484', 
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#B0BEC5' 
    },
    background: {
      paper: '#3B4D5D', 
    },
  },
  typography: {
    button: {
      color: '#FFA500', 
    },
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: '#1B242C',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

const NewsCard = ({ news, handleOpen }) => (
  <Card
    sx={{ maxWidth: 345, backgroundColor: '#1B242C', color: 'text.primary', margin: '16px', cursor: 'pointer' }}
    onClick={() => handleOpen(news)}
  >
    {news.urlToImage && (
      <CardMedia
        component="img"
        height="140"
        image={news.urlToImage}
        alt={news.title}
      />
    )}
    <CardContent>
      <Typography variant="h6" component="div" sx={{ color: 'white' }}>
        {news.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {news.description}
      </Typography>
    </CardContent>
  </Card>
);

const NewsModal = ({ open, handleClose, news }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      {news.urlToImage && (
        <CardMedia
          component="img"
          height="400"
          image={news.urlToImage}
          alt={news.title}
        />
      )}
      <CardContent>
        <Typography id="modal-modal-title" variant="h4" component="div" sx={{ color: 'white' }}>
          {news.title}
        </Typography>
        <Typography id="modal-modal-description" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {news.content || news.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>
            Leer más
          </a>
        </Typography>
      </CardContent>
    </Box>
  </Modal>
);

const NFTNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=nft&apiKey=eabbeb3ded5f473380d9d251cef37290')
      .then(response => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching NFT news:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleOpen = (news) => {
    setSelectedNews(news);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error loading NFT news: {error.message}</Typography>;
  }

  if (news.length === 0) {
    return <Typography variant="h6" color="text.primary">No NFT news found.</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" sx={{ backgroundColor: '#12161C', padding: 2 }}>
        {news.map((article, index) => (
          <NewsCard news={article} key={index} handleOpen={handleOpen} />
        ))}
      </Grid>
      {selectedNews && <NewsModal open={open} handleClose={handleClose} news={selectedNews} />}
    </ThemeProvider>
  );
};

export default NFTNewsSection;