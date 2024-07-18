import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Box, CircularProgress } from '@mui/material';
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

const NFTNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
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
    }, 2000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '97%', minHeight: '100vh', bgcolor: '#0d1316', padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress color="primary" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        ) : (
          <Grid container justifyContent="center" spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            {error && <Typography variant="h6" color="error" sx={{ width: '100%', textAlign: 'center' }}>{error.message}</Typography>}
            {!error && news.length === 0 && (
              <Typography variant="h6" color="text.primary" sx={{ width: '100%', textAlign: 'center' }}>No NFT news found.</Typography>
            )}
            {news.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: 345, bgcolor: '#1B242C', color: 'text.primary', m: 1, display: 'flex', flexDirection: 'column' }}>
                  {article.urlToImage && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.urlToImage}
                      alt={article.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default NFTNews;
