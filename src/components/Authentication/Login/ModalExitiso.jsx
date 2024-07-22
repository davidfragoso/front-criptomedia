import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Fade } from '@mui/material';
import { orange } from '@mui/material/colors';

const ModalExitoso = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    color: orange[500],
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" style={{ color: orange[500] }}>
        Abrir Modal de Éxito
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              El registro ha sido exitoso
            </Typography>
            <Button onClick={handleClose} sx={{ mt: 2, bgcolor: orange[500], '&:hover': { bgcolor: orange[700] } }}>
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalExitoso;
