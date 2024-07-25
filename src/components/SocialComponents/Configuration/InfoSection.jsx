import React, { useState } from 'react';
import { Box, TextField, Button, Grid, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const InfoField = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar la información
    // Simulamos un error al guardar la información
    const hasError = false;

    if (hasError) {
      setErrorToastOpen(true);
    } else {
      setToastOpen(true);
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleCloseErrorToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorToastOpen(false);
  };

  return (
    <SectionBox>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <InfoField>
            <TextField
              label="Nombre completo"
              defaultValue="Joe Doe"
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
            />
          </InfoField>
          <InfoField>
            <TextField
              label="Usuario"
              defaultValue="Joe Doe"
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
            />
          </InfoField>
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoField>
            <TextField
              label="Sitio web"
              defaultValue="www.criptocats.com"
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
            />
          </InfoField>
          {/* <InfoField>
            <TextField
              label="Fecha de nacimiento"
              defaultValue="27/01/2002"
              type="date"
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
              InputLabelProps={{ shrink: true }}
            />
          </InfoField> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoField>
            <TextField
              label="Nueva contraseña"
              defaultValue="Contraseña nueva"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color: '#7190ac' }} /> : <Visibility sx={{ color: '#7190ac' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </InfoField>
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoField>
            <TextField
              label="Nuevo Email"
              defaultValue="Email"
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
            />
          </InfoField>
        </Grid>
        <Grid item xs={12}>
          <InfoField>
            <TextField
              label="Biografía"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem turpis, rutrum nec ornare sit amet."
              multiline
              rows={4}
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: '#1e2329',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  color: '#7C9EBD',
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                },
              }}
            />
          </InfoField>
        </Grid>
        <Divider sx={{ borderColor: '#7C9EBD' }} />
        <Grid item xs={12}>
          <Button variant="contained" color="primary" sx={{ backgroundColor: 'DarkOrange' }} onClick={handleSave}>
            Guardar
          </Button>
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ borderColor: '#7C9EBD' }} />
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }} // Mueve el toast hacia abajo
      >
        <Alert onClose={handleCloseToast} severity="success">
          Configuración Guardada
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorToastOpen}
        autoHideDuration={2000}
        onClose={handleCloseErrorToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }} // Mueve el toast hacia abajo
      >
        <Alert onClose={handleCloseErrorToast} severity="error">
          Ocurrió un error al guardar la información
        </Alert>
      </Snackbar>
    </SectionBox>
  );
};

export default InfoSection;
