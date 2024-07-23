import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton, Link, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 300, md: 400 },
  bgcolor: '#1F262D',
  border: '#1F262D',
  boxShadow: 24,
  p: { xs: 3, sm: 4 },
  color: 'black',
  borderRadius: 3,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    username: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setToastOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (formData.username.length > 50) {
      errors.username = "El nombre de usuario no puede exceder los 50 caracteres";
    }
    if (!formData.email.includes('@')) {
      errors.email = "Correo inválido. Asegúrese de incluir '@'.";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      errors.password = "La contraseña debe tener:\n- Al menos 8 caracteres\n- Una letra mayúscula\n- Una letra minúscula\n- Un número";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     setOpen(false);
  //     setToastOpen(true);
  //   } else {
  //     console.log('Formulario inválido, mostrar errores');
  //   }
  // };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('https://coinversesocialapi.azurewebsites.net/api/Users', {
            "fullName": formData.nombre,
            "userName": formData.username,
            "email": formData.email,
            "password": formData.password,
            "date": "2024-07-16T23:27:07.173Z"
        });
        console.log('Respuesta del servidor:', response.data);
        setOpen(false);
        setToastOpen(true);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    } else {
      console.log('Formulario inválido, mostrar errores');
    }
  };

  return (
    <div>
      <Link component="button" variant="body2" onClick={handleOpen} sx={{ textTransform: 'none', cursor: 'pointer', marginLeft: 2, color: 'DarkOrange', fontSize: 12 }}>
        REGÍSTRATE
      </Link>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} position="relative">
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '36px', color: '#FF8A00', textAlign: 'center', mt: 2 }}>
            REGISTRO
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField variant="outlined" margin="normal" fullWidth label="Nombre completo" name="nombre" autoComplete="nombre-completo" autoFocus color="warning" onChange={handleChange} sx={{
              '& fieldset': {
                borderColor: '#8A8888',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: '#8A8888',
              },
            }} />
            <TextField variant="outlined" margin="normal" fullWidth label="Nombre de usuario" name="username" autoComplete="username" autoFocus color="warning" onChange={handleChange} error={!!formErrors.username} helperText={formErrors.username} sx={{
              '& fieldset': {
                borderColor: '#8A8888',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: '#8A8888',
              },
            }}/>
            <TextField variant="outlined" margin="normal" fullWidth label="Correo electrónico" name="email" autoComplete="email" autoFocus color="warning" onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email} sx={{
              '& fieldset': {
                borderColor: '#8A8888',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: '#8A8888',
              },
            }}/>
            <TextField variant="outlined" margin="normal" fullWidth type='password' label="Contraseña" name="password" autoComplete="new-password" autoFocus color="warning" onChange={handleChange} error={!!formErrors.password} helperText={formErrors.password} sx={{
              '& fieldset': {
                borderColor: '#8A8888',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: '#8A8888',
              },
            }}/>
            <Button sx={{ backgroundColor: '#FF8A00', '&:hover': { backgroundColor: '#FF8A00' } }} variant="contained" onClick={handleRegister}>
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseToast} severity="success">
          Registro Exitoso
        </Alert>
      </Snackbar>
    </div>
  );
}
