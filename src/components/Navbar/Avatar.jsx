import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Avatar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const isTablet = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      const userId = localStorage.getItem('LoggedUser');
      console.log('userId:', userId);
      if (userId) {
        try {
          const response = await axios.get(`https://coinversesocialapi.azurewebsites.net/api/Users/${userId}`);
          if(isMounted) {
            setUser(response.data);
            console.log(response.data);         
          }
        } catch (error) {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      }
    };
  
    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navegar a la vista de perfil
    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/login'); // Navegar a la vista de login
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        size="small"
        ref={anchorRef}
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src="../images/yop.jfif"
          alt="David Fragoso"
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: isTablet ? '0' : '8px' }}
        />
        {!isTablet && (
          <Stack direction="column" alignItems="flex-start" spacing={0}>
            <Typography variant="body2" color="white">
              {user?.fullName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              />
              <Typography variant="caption" color="white">
                En línea
              </Typography>
            </Stack>
          </Stack>
        )}
        <ArrowDropDownIcon sx={{ color: "white" }} />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <MenuItem onClick={handleProfileClick}>
                    <IconButton size="large" aria-label="show profile" color="inherit">
                      <AccountCircleIcon />
                    </IconButton>
                    <p>Perfil</p>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <IconButton size="large" aria-label="logout" color="inherit">
                      <LogoutIcon />
                    </IconButton>
                    <p>Cerrar sesión</p>
                  </MenuItem>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
