import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography
} from '@mui/material';

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios.get('https://api.coinpaprika.com/v1/tickers')
      .then(response => {
        setCryptos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Prices
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price (USD)</TableCell>
              <TableCell align="right">Volume 24h (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos.map((crypto) => (
              <TableRow key={crypto.id}>
                <TableCell>{crypto.name}</TableCell>
                <TableCell align="right">{crypto.quotes.USD.price.toFixed(2)}</TableCell>
                <TableCell align="right">{crypto.quotes.USD.volume_24h.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CryptoTable;
