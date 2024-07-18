import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#0d1316', padding: 3, overflow: 'hidden' }}>
        <Grid container justifyContent="center" spacing={4}>
          {error && <Typography variant="h6" color="error">{error.message}</Typography>}
          {!loading && !error && news.length === 0 && (
            <Typography variant="h6" color="text.primary">No NFT news found.</Typography>
          )}
          {news.map((article, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 345, backgroundColor: '#1B242C', color: 'text.primary', margin: '16px', cursor: 'pointer' }}>
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.urlToImage}
                    alt={article.title}
                  />
                )}
                <CardContent>
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
      </Box>
    </ThemeProvider>
  );
};

export default NFTNews;
