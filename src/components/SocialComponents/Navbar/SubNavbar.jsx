import React, { useState } from 'react';

const styles = {
  subNavbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#12161C',
    padding: '10px 20px',
    color: '#ffffff',
    top: '60px',
    width: 'calc(100% - 240px)',
    zIndex: 999,
  },
  searchBox: {
    backgroundColor: '#1B232D',
    border: 'none',
    padding: '6px 12px', 
    borderRadius: '4px',
    color: '#ffffff',
    marginRight: '20px',
    width: '200px', 
    height: '25px', 
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#ffffff',
    position: 'relative'
  },
  tabSelected: {
    borderBottom: '4px solid #FF8A00',
    color: '#FF8A00',
  }
};

const SubNavbar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div style={styles.subNavbar}>
      <input
        type="text"
        placeholder="Buscar..."
        style={styles.searchBox}
      />
      <div
        style={{ ...styles.tab, ...(selectedTab === 0 ? styles.tabSelected : {}) }}
        onClick={() => handleTabClick(0)}
      >
        Principal
      </div>
      <div
        style={{ ...styles.tab, ...(selectedTab === 1 ? styles.tabSelected : {}) }}
        onClick={() => handleTabClick(1)}
      >
        Tendencia
      </div>
      <div
        style={{ ...styles.tab, ...(selectedTab === 2 ? styles.tabSelected : {}) }}
        onClick={() => handleTabClick(2)}
      >
        Amigos
      </div>
    </div>
  );
};

export default SubNavbar;
