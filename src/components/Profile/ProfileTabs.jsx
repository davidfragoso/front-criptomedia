import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/system';

const CustomTabs = styled(Tabs)({
  backgroundColor: '#1e1e1e',
  borderBottom: "2px solid #27333E",
  borderLeft: "2px solid #27333E",
  borderRight: "2px solid #27333E",
  borderRadius: '0 0 10px 10px',

  '& .MuiTabs-indicator': {
    backgroundColor: '#ff8a00',
  },
});

const CustomTab = styled(Tab)({
  color: '#ffffff',
  '&.Mui-selected': {
    color: '#ff8a00',
  },
  '&:hover': {
    color: '#ff8a00',
  },
});

const ProfileTabs = ({ value, onChange }) => {
  return (
    <Box>
      <CustomTabs value={value} onChange={onChange} variant="fullWidth">
        <CustomTab label="Publicaciones" />
        <CustomTab label="Comentarios" />
        <CustomTab label="Multimedia" />
        <CustomTab label="Me gusta" />
      </CustomTabs>
    </Box>
  );
};

export default ProfileTabs;
