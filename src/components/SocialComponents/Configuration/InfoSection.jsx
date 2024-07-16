import React from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const InfoField = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const InfoSection = () => (
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
        <InfoField>
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
        <Button variant="contained" color="primary" sx={{ backgroundColor: 'DarkOrange' }}>
          Guardar
        </Button>
      </Grid>
    </Grid>
    <br />
    <Divider sx={{ borderColor: '#7C9EBD' }} />
  </SectionBox>
);

export default InfoSection;
