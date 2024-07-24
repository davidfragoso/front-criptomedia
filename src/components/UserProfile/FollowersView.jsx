import React, { useState } from 'react';
import SubNavbar from './SubNavFollowers';
import Followers from './Followers'; // Asegúrate de ajustar la ruta según sea necesario
import MediaCardGrid from './CardsView';
import Following from './Seguidos'

const FollowersView = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div>
      <SubNavbar selectedTab={selectedTab} onTabClick={handleTabClick} />
      {selectedTab === 0 && <Followers />}
      {selectedTab === 1 && <div><Following /></div>}
      {selectedTab === 2 && <div><MediaCardGrid /></div>}
    </div>
  );
};

export default FollowersView;
