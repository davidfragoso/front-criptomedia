import React from 'react';
import { Box, Avatar, Typography, Button, Grid, Container, TextField, Paper } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';

const ProfileContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  borderRadius: '10px',
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(4),
  overflowY: 'auto',
  maxHeight: '80vh',
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: '10px',
  backgroundColor: '#273b4f',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
}));

const InfoBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#12161C',
  color: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Profile = () => {
  return (
    <ProfileContainer maxWidth="lg">
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={4}>
        <Avatar 
          src="../images/yop.jfif"
          alt="David Fragoso"
          sx={{ width: 120, height: 120, marginBottom: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        />
        <Typography variant="h4" gutterBottom>David Fragoso</Typography>
        <Typography variant="body1" gutterBottom>Miembro desde: Enero 2023</Typography>
      </Box>
      
      <Grid container spacing={2} justifyContent="center" mb={4}>
        <Grid item xs={12} sm={4}>
          <StatBox>
            <Typography variant="h6">120</Typography>
            <Box ml={1}>
              <Typography variant="body2">Likes</Typography>
            </Box>
          </StatBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatBox>
            <Typography variant="h6">45</Typography>
            <Box ml={1}>
              <Typography variant="body2">Comentarios</Typography>
            </Box>
          </StatBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatBox>
            <Typography variant="h6">30</Typography>
            <Box ml={1}>
              <Typography variant="body2">Compartidos</Typography>
            </Box>
          </StatBox>
        </Grid>
      </Grid>

      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<EditIcon />}
        sx={{ backgroundColor: '#0277bd', marginBottom: 4 }}
      >
        EDITAR PERFIL
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Información del Usuario</Typography>
            <Typography variant="body1">David Fragoso / Web Developer</Typography>
            <Typography variant="body2" gutterBottom>
              Ujang Maman is a superhero name in Indonesia, especially in my family. He is not a fictional character but an original hero in my family, a hero for his children and for his wife. So, I use the name as a user in this templates. Not a tribute, I'm just bored with 'Vukan Doe'.
            </Typography>
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#0277bd' }}>Seguir</Button>
          </InfoBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Autenticación de Dos Factores</Typography>
            <Button variant="contained" color="secondary" sx={{ backgroundColor: '#d32f2f', marginBottom: 2 }}>Desactivar Autenticación de Dos Factores</Button>
            <Typography variant="body2" gutterBottom>
              Two-factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <img src="path_to_qr_code_image" alt="QR Code" />
            </Box>
            <Typography variant="body2">Store these recovery codes in a secure password manager.</Typography>
            <Box component="pre" bgcolor="#1e2733" p={2} mt={2}>
              <code>
                W5HUYRCYFV-...<br/>
                GCH4BJEB-...<br/>
                N3BMGTOPD-...<br/>
                ...
              </code>
            </Box>
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#0277bd', marginTop: 2 }}>Generar Nuevos Códigos de Recuperación</Button>
          </InfoBox>
        </Grid>
        <Grid item xs={12}>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Actualizar Perfil</Typography>
            <TextField
              fullWidth
              label="Nombre"
              defaultValue="David Fragoso"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              defaultValue="david@example.com"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
            />
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#0277bd' }}>Actualizar Perfil</Button>
          </InfoBox>
        </Grid>
        <Grid item xs={12}>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Actualizar Contraseña</Typography>
            <TextField
              fullWidth
              label="Contraseña Actual"
              type="password"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
            />
            <TextField
              fullWidth
              label="Nueva Contraseña"
              type="password"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
            />
            <TextField
              fullWidth
              label="Confirmar Nueva Contraseña"
              type="password"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
            />
            <Button variant="contained" color="primary" sx={{ backgroundColor: '#0277bd' }}>Actualizar Contraseña</Button>
          </InfoBox>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default Profile;
