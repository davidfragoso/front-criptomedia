import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReportIcon from '@mui/icons-material/Report';
import BlockIcon from '@mui/icons-material/Block';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', // Color naranja para botones
    },
    secondary: {
      main: '#005484', // Color azul para el botón de mensaje
    },
    text: {
      primary: '#FFFFFF', // Color blanco para el texto
      secondary: '#B0BEC5' // Color gris para el texto secundario
    },
    background: {
      paper: '#3B4D5D', // Color específico para el fondo de las tarjetas
    },
  },
  typography: {
    button: {
      color: '#FFA500', // Color naranja para el texto de los botones
    },
  },
});

const options = [
  { icon: <ReportIcon />, text: 'Reportar' },
  { icon: <BlockIcon />, text: 'Bloquear' },
  { icon: <PersonRemoveIcon />, text: 'Dejar de seguir' },
];

const ITEM_HEIGHT = 48;

function MediaCard({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1B242C', color: 'text.primary' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Badge
              color={user.online ? "success" : "error"}
              overlap="circular"
              badgeContent=" "
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Avatar src={user.image} sx={{ width: 120, height: 120, margin: 'auto' }} />
            </Badge>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">
              {user.name}
            </Typography>
            <Typography variant="body2" color={user.online ? "success" : "error"}>
              {user.online ? 'En línea' : 'Desconectado'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seguidor desde {user.since}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" sx={{ backgroundColor: '#005484', color: 'white', margin: 'auto', display: 'block' }}>
          Mensaje
        </Button>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ 
            margin: 'auto', 
            display: 'block', 
            backgroundColor: '#3B4D5D', 
            borderRadius: '8px', 
            width: '48px', 
            height: '36px',
            color: 'white',
            justifyContent: 'center', 
            alignItems: 'center', 
            '&:hover': {
              backgroundColor: '#3B4D5D',
            },
          }}
        >
          <MoreHorizIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.text} onClick={handleClose}>
              {option.icon}
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {option.text}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </CardActions>
    </Card>
  );
}

const users = [
  { name: 'John Doe', online: false, since: 'mayo 2024', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', online: true, since: 'junio 2023', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Alice Johnson', online: false, since: 'abril 2022', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { name: 'Bob Brown', online: true, since: 'enero 2021', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { name: 'Charlie Davis', online: true, desde: 'marzo 2020', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { name: 'Diana Evans', online: false, since: 'julio 2019', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { name: 'Edward Franklin', online: true, since: 'septiembre 2018', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { name: 'Fiona Green', online: false, since: 'octubre 2017', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { name: 'George Hill', online: true, since: 'noviembre 2020', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { name: 'Hannah Wright', online: false, since: 'diciembre 2019', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { name: 'Ivy Adams', online: true, since: 'enero 2018', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Jack White', online: false, since: 'febrero 2021', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Karen Black', online: true, since: 'marzo 2023', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
  { name: 'Leo King', online: false, since: 'abril 2020', image: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { name: 'Mia Scott', online: true, since: 'mayo 2021', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
  { name: 'Noah Brown', online: false, since: 'junio 2017', image: 'https://randomuser.me/api/portraits/men/16.jpg' },
];

export default function MediaCardGrid() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ backgroundColor: '#12161C', padding: 2 }}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <MediaCard user={user} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
