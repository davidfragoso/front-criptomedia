import React, { useState } from 'react';

const styles = {
  subNavbar: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    backgroundColor: '#12161C',
    padding: '10px 20px',
    color: '#ffffff',
    top: '60px',
    width: 'calc(100% - 240px)', // Ajuste para que no se solape con el Sidebar
    zIndex: 999,
  },
  searchBox: {
    backgroundColor: '#1B232D',
    border: 'none',
    padding: '6px 12px', // Ajuste del padding para hacerlo más pequeño
    borderRadius: '4px',
    color: '#ffffff',
    marginRight: '20px',
    width: '200px', // Ajuste del ancho para hacerlo más pequeño
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#ffffff',
    position: 'relative' as 'relative'
  },
  tabSelected: {
    borderBottom: '4px solid #FF8A00',
    color: '#FF8A00',
  }
};

const SubNavbar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
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
