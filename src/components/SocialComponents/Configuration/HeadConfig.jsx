import React from 'react';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const HeadConfig = () => (
  <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom align='left'>
      <br />
      Configuración
    </Typography>
    <Divider component="" sx={{borderColor: '#7C9EBD',}}/>
  </Box>
);

export default HeadConfig;
