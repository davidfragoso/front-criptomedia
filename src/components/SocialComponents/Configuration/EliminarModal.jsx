import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';
import { styled } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#12161C', // Light red
    color: '#d32f2f', // Dark red
    textAlign: 'center'
  },
  '& .MuiDialogContent-root': {
    backgroundColor: '#1e2329', // White background
  },
  '& .MuiDialogActions-root': {
    backgroundColor: '#1e2329', // White background
    display: 'flex',
  },
});

const StyledButton = styled(Button)({
  margin: '8px',
  '&:first-of-type': {
    backgroundColor: '#e0e0e0', // Light grey
    color: '#1e2329', // Black
    marginRight: 'auto',
  },
  '&:last-of-type': {
    backgroundColor: '#d32f2f', // Dark red
    color: '#ffffff', // White
  },
});

const DeleteAccountModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Confirmar Eliminación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" color={'#ffffff'} textAlign={'center'}>
          <br />
          ¿Está seguro de que desea eliminar su cuenta?
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description" color={'#7190AC'} textAlign={'center'}>
          Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent >
      <DialogActions>
        <StyledButton onClick={handleClose}>
          Cancelar
        </StyledButton>
        <StyledButton onClick={handleConfirm}>
          Confirmar
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DeleteAccountModal;
