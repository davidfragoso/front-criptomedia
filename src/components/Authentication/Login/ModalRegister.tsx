import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';
import { Padding } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1F262D',
  border: '#1F262D',
  boxShadow: 24,
  p: 4,
  color: 'black',
  
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Link
        component="button"
        variant="body2"
        onClick={handleOpen}
        sx={{ textTransform: 'none', cursor: 'pointer', marginLeft: 2, color: 'DarkOrange', fontSize: 12 }}

      >
        REGÍSTRATE
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={3} position="relative">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: '36px',
              color: '#FF8A00',
              textAlign: 'center',
              mt: 2,
            }}
          >
            REGISTRO
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              id="outlined-basic-usuario"
              label="USUARIO"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8A8888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8A8888',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
            <TextField
              id="outlined-basic-correo"
              label="CORREO ELECTRONICO"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8A8888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8A8888',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
            <TextField
              id="outlined-basic-contrasena"
              label="CONTRASEÑA"
              variant="outlined"
              type="password"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8A8888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8A8888',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
            <Button
              sx={{
                backgroundColor: '#FF8A00',
                '&:hover': {
                  backgroundColor: '#FF8A00', // Color para el estado hover
                },
              }}
              variant="contained"
            >
              Crear cuenta
            </Button>
            <Typography id="modal-modal-description" sx={{ mt: 2, color: 'white' }}>
              ¿YA TIENES CUENTA? <Button variant="text" sx={{ color: '#FF8A00' }}>INICIA SESION</Button>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}