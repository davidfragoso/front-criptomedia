import React, { useState } from 'react';

const styles = {
  subNavbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#12161C',
    padding: '10px 20px',
    color: '#ffffff',
    top: '60px',
    width: '100%',
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

const SubNavbar = ({ selectedTab, onTabClick }) => {
  return (
    <div style={styles.subNavbar}>
      <div
        style={{ ...styles.tab, ...(selectedTab === 0 ? styles.tabSelected : {}) }}
        onClick={() => onTabClick(0)}
      >
        Seguidores
      </div>
      <div
        style={{ ...styles.tab, ...(selectedTab === 1 ? styles.tabSelected : {}) }}
        onClick={() => onTabClick(1)}
      >
        Seguidos
      </div>
      <div
        style={{ ...styles.tab, ...(selectedTab === 2 ? styles.tabSelected : {}) }}
        onClick={() => onTabClick(2)}
      >
        Disponibles
      </div>
    </div>
  );
};

export default SubNavbar;
