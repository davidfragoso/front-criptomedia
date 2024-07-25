import React, { useEffect, useState } from 'react';
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
      main: '#FFA500',
    },
    secondary: {
      main: '#005484',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5'
    },
    background: {
      paper: '#3B4D5D',
    },
  },
  typography: {
    button: {
      color: '#FFA500',
    },
  },
});

const options = [
  { icon: <ReportIcon />, text: 'Reportar' },
  { icon: <BlockIcon />, text: 'Bloquear' },
  { icon: <PersonRemoveIcon />, text: 'Dejar de seguir' },
];

const ITEM_HEIGHT = 48;

function Following({ user }) {
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
              <Avatar src={user.avatar_url} sx={{ width: 120, height: 120, margin: 'auto' }} />
            </Badge>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">
              {user.username}
            </Typography>
            <Typography variant="body2" color={user.online ? "success" : "error"}>
              {user.online ? 'En línea' : 'Desconectado'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seguido desde {user.following_since}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" sx={{ backgroundColor: '#005484', color: 'white', margin: 'auto', display: 'block' }}>
          Seguir
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

export default function FollowingCardGrid() {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetch('https://coinversesocialapi.azurewebsites.net/api/Users/1/following')
      .then(response => response.json())
      .then(data => setFollowing(data))
      .catch(error => console.error('Error fetching following:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ backgroundColor: '#12161C', padding: 2 }}>
        {following.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Following user={user} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
