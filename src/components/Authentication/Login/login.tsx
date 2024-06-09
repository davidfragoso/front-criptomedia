import React from 'react';
import { Grid, Box, Typography, TextField, Button, Link } from '@mui/material';
import Imgsvg from '../../../Assets/Login/bgsvg'
import Imgorange from '../../../Assets/Login/imgorange'
import CoinverseLogo from '../../../Assets/Login/CoinverseLogo'
import BasicModal from '../Login/ModalRegister'
import Logo from '../../../Assets/Login/Logo.png'


const styles = {
  container: {
    minHeight: '100vh',
  },
  leftSide: {
    backgroundColor: '#12161C',
    color: '#ff9800',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  rightSide: {
    backgroundColor: '#12161C',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1F262D',
    borderRadius: 2,
    padding: 8,
    position: 'absolute',
    justifyContent: 'space-between',
    top: 100,
    right:100,
  },
  submitButton: {
    margin: '74px 0px 16px',
    backgroundColor: 'DarkOrange',

  },
  forgotPasswordLink: {
    display: 'block',
    textAlign: 'left',
    color: '#FF8A00'
  },
};

const Login = () => {
  return (
    <Grid container sx={styles.container}>
      {/* IZQ*/}
      <Grid
        item
        xs={false}
        md={7}
        lg={8}
        sx={styles.leftSide}
      >
        <Typography variant="h3" gutterBottom>
          ÚNETE A LA REVOLUCIÓN
        </Typography>
        <Box sx={{top: 203}}>
        <Imgsvg/> {/*COMPONENTE BACKGROUND IMAGEN SVG */}
        </Box>
      </Grid>

      {/* DRCH */}
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={styles.rightSide}
      >
        <Grid item
        xs={false}
        sx={{position:'absolute', top:-6, right:7 }}>

        <Imgorange/>
        </Grid>

        <Box sx={styles.box}>
          <img src={Logo} alt="" style={{width:400}}/>
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
          <Link href="#" variant="body2" sx={styles.forgotPasswordLink}>
            ¿Olvidaste tu contraseña?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.submitButton}
          >
            INICIAR SESIÓN
          </Button>
          <Grid container >
            <Grid item sx={{display: 'Flex'}}>
              <Typography sx={{color: 'white', fontSize: 12, alignContent: 'left'}}>¿NO TIENES CUENTA?  </Typography>
              <BasicModal/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
