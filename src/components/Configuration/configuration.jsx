// Archivo JSX
import React from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import HeadConfig from './HeadConfig';
import InfoSection from './InfoSection';
import AccountSection from './AccountSection';

const ConfigurationContainer = styled(Container)(({ theme }) => ({
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

const Configuration = () => {
  return (
    <ConfigurationContainer maxWidth="md">
      <HeadConfig />
      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <InfoSection />
        <AccountSection />
      </Box>
    </ConfigurationContainer>
  );
};

export default Configuration;
