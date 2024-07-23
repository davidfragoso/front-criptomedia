import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BasicModal from './ModalRegister';
import images from '../../../imageRoutes';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "El correo electrónico debe ser válido.";
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      return "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número.";
    }
    return '';
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: '#12161C', overflow: 'hidden' }}>
      {/* Fondo animado para móviles */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }}>
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </Box>
      <Grid container sx={{ position: 'relative', zIndex: 2, minHeight: '100vh', overflowY: { xs: 'auto', md: 'auto', lg: 'hidden' } }}>
        {/* IZQ */}
        <Grid
          item
          xs={false}
          md={7}
          lg={8}
          sx={{
            backgroundColor: '#12161C',
            color: '#ff9800',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
                lg: '3rem',
              }
            }}
          >
            ÚNETE A LA REVOLUCIÓN
          </Typography>
          <Box sx={{ width: '70%' }}>
            <img src={images.bgsvg} alt="Revolutionary Background" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>

        {/* DRCH */}
        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
          }}
        >
          <Grid
            item
            xs={false}
            sx={{
              position: 'absolute',
              top: -6,
              right: 7,
              display: { xs: 'none', md: 'none', lg: 'block' },
            }}
          >
            <img src={images.imgOrange} alt="Decorative Orange" style={{ width: '100%', height: 'auto' }} />
          </Grid>

          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 270, sm: 300, lg: 400 },
              backgroundColor: '#1F262D',
              borderRadius: 2,
              padding: { xs: 3, sm: 8 },
              position: 'absolute',
              top: { xs: '50%', sm: '50%', lg: '40%', md:'50%' },
              left: {lg: '35%', sm:'50%', md:'50%' ,xs: '50%'},
              transform: 'translate(-50%, -50%)',
              marginBottom: { xs: 6, sm: 6, md: 4, lg: 4 },
            }}
          >
            <img src={images.coinverseLogo} alt="Coinverse Logo" style={{ width: '100%' }} />
            <br />
            <br />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              color="warning"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                '& fieldset': {
                  borderColor: '#8A8888',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: '#8A8888',
                },
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              color="warning"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                '& fieldset': {
                  borderColor: '#8A8888',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: '#8A8888',
                },
              }}
            />
            <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'left', color: '#FF8A00' }}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: '40px 0px 16px', backgroundColor: 'DarkOrange' }}
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </Button>
            <Grid container>
              <Grid item sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'white', fontSize: 12, alignContent: 'left' }}>¿NO TIENES CUENTA? </Typography>
                <BasicModal />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
};

export default Login;
