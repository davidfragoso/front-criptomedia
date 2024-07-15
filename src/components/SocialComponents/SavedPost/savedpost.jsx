import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';


const SavedPostCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: '#1D2228',
  color: '#ffffff',
  borderRadius: '10px',
  width: '100%',
  height: '200px',
}));


const SectionTitle = ({ children }) => (
  <Typography variant="h4" gutterBottom sx={{color: "white"}}>
    {children}
  </Typography>
);

const SavedPosts = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const savedPosts = [
    { id: 1, title: 'Post 1', content: 'Contenido del Post 1' },
    { id: 2, title: 'Post 2', content: 'Contenido del Post 2' },
    { id: 3, title: 'Post 3', content: 'Contenido del Post 3' },
    { id: 4, title: 'Post 4', content: 'Contenido del Post 4' },
    { id: 3, title: 'Post 5', content: 'Contenido del Post 3' },
    { id: 4, title: 'Post 6', content: 'Contenido del Post 4' },
    { id: 3, title: 'Post 7', content: 'Contenido del Post 3' },
    { id: 4, title: 'Post 8', content: 'Contenido del Post 4' },
  ];

  return (
    <Container>
      <Box sx={{ padding: 2 }}>
        <SectionTitle>Publicaciones Guardadas</SectionTitle>
        <Divider sx={{ borderColor: '#7C9EBD' }} />
        <br />
        <Grid container spacing={2}>
          {savedPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <Grid item xs={12} sm={6}>
                <SavedPostCard>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{post.title}</Typography>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Eliminar de guardados</MenuItem>
                      </Menu>
                    </Box>
                    <Typography variant="body1">{post.content}</Typography>
                  </CardContent>
                </SavedPostCard>
              </Grid>
              {(index + 1) % 2 === 0 && index !== savedPosts.length - 1 && (
                <Grid item xs={12}>
                  <Divider sx={{ borderColor: '#7C9EBD' }} />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SavedPosts;
