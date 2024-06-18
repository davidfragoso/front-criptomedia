import React, { useState } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import InfoProfileSection from './InfoProfileSection';
import ProfileContent from './ProfileContent';
import ProfileTabs from './ProfileTabs';
import ProfileTabContent from './ProfileTabContent';

const ProfileContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#12161C',
  color: '#ffffff',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
  maxHeight: '100vh',
  minWidth: '100%', 
}));

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <ProfileContainer maxWidth="md">
      <InfoProfileSection />
      <ProfileTabs value={tabIndex} onChange={handleTabChange} />
      <ProfileTabContent value={tabIndex} index={0}>
        <ProfileContent />
      </ProfileTabContent>
      <ProfileTabContent value={tabIndex} index={1}>
        Comentarios
      </ProfileTabContent>
      <ProfileTabContent value={tabIndex} index={2}>
        Multimedia
      </ProfileTabContent>
      <ProfileTabContent value={tabIndex} index={3}>
        Me gusta
      </ProfileTabContent>
    </ProfileContainer>
  );
};

export default Profile;
