import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import DeleteAccountModal from './EliminarModal'; // Asegúrate de que la ruta sea correcta

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const AccountSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // Aquí puedes agregar la lógica para eliminar la cuenta
    setDialogOpen(false);
    console.log('Cuenta eliminada');
  };

  return (
    <SectionBox>
      <Typography variant="h6" color="error" gutterBottom>
        Cuenta
      </Typography>
      <Button variant="contained" color="error" onClick={handleOpenDialog}>
        Eliminar
      </Button>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1, color: '#7C9EBD' }}>
        Se eliminará la cuenta de forma permanente.
      </Typography>
      <DeleteAccountModal
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDelete}
      />
    </SectionBox>
  );
};

export default AccountSection;
