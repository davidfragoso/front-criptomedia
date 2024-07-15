import React from 'react';
import { Box } from '@mui/material';

interface ProfileTabContentProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default ProfileTabContent;
