import React from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import HeadConfig from '../Configuration/HeadConfig';
import SavedPosts from './SavedPosts'; // Importa tu nuevo componente de publicaciones guardadas

const SavedContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#12161C',
  color: '#ffffff',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
  height: '100vh',
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const SavedView = () => {
  return (
    <SavedContainer maxWidth="md">
      <HeadConfig />
      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <SavedPosts /> {/* Aquí es donde se muestran las publicaciones guardadas */}
      </Box>
    </SavedContainer>
  );
};

export default SavedView;
