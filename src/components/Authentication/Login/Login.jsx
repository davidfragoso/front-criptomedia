import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BasicModal from './ModalRegister';
import images from '../../../imageRoutes';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://coinversesocialapi.azurewebsites.net/api/Users/`);
      const user = response.data.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('Login exitoso:', user);
        localStorage.setItem('LoggedUser', user.pkUser);
        navigate('/');
      } else {
        console.log('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error, el usuario no existe:', error);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* IZQ */}
      <Grid
        item
        xs={false}
        md={7}
        lg={8}
        sx={{
          backgroundColor: '#12161C',
          color: '#ff9800',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Typography variant="h3" gutterBottom>
          ÚNETE A LA REVOLUCIÓN
        </Typography>
        <Box sx={{ top: 203 }}>
          <img src={images.bgsvg} alt="Background SVG" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Grid>

      {/* DRCH */}
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{
          backgroundColor: '#12161C',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Grid
          item
          xs={false}
          sx={{ position: 'absolute', top: -6, right: 7 }}
        >
          <img src={images.imgOrange} alt="Orange Image" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#1F262D',
            borderRadius: 2,
            padding: 8,
            position: 'absolute',
            justifyContent: 'space-between',
            top: 100,
            right: 100,
          }}
        >
          <img src={images.coinverseLogo} alt="Logo" style={{ width: 400 }} />
          <br />
          <br />

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            color="warning"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            color="warning"
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
            sx={{ margin: '74px 0px 16px', backgroundColor: 'DarkOrange' }}
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
  );
};

export default Login;
