import React, { useState, useEffect } from 'react';
import CryptoTable from './CryptoTable';
import CryptoCards from './CryptoCards';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';


const CryptoContainer = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
      setCryptoData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {isMobile ? <CryptoCards cryptoData={cryptoData} /> : <CryptoTable />}
    </div>
  );
};

export default CryptoContainer;
