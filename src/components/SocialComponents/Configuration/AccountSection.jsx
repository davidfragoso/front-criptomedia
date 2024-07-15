import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const AccountSection = () => (
  <SectionBox>
    <Typography variant="h6" color="error" gutterBottom>
      Cuenta
    </Typography>
    <Button variant="contained" color="error">
      Eliminar
    </Button>
    <Typography variant="body2" color="textSecondary" sx={{ mt: 1, color: '#7C9EBD' }}>
      Se eliminará la cuenta de forma permanente.
    </Typography>
  </SectionBox>
);

export default AccountSection;
