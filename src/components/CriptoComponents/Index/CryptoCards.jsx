import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Typography, TablePagination, TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cryptoTableContainer: {
    margin: '20px',
    backgroundColor: '#0d1316',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
  },
  cryptoTableTitle: {
    marginBottom: '10px',
    color: '#ffffff',
  },
  cryptoTableSubtitle: {
    marginBottom: '20px',
    color: '#aaaaaa',
  },
  cryptoTable: {
    backgroundColor: '#0d1316',
  },
  tableHeadCell: {
    backgroundColor: '#12161c',
    color: '#ffffff',
    borderColor: '#2e2e2e'
  },
  tableCell: {
    color: '#ffffff',
    borderColor: '#2e2e2e'
  },
  tableRowOdd: {
    backgroundColor: '#12161c',
  },
  tableRowEven: {
    backgroundColor: '#0d1316',
  },
  pagination: {
    color: '#ffffff',
    backgroundColor: '#12161c',
  },
  selectIcon: {
    color: '#ffffff',
  },
  searchField: {
    marginBottom: '20px',
    backgroundColor: '#333333',
    borderRadius: '4px',
    color: '#ffffff'
  },
  searchInput: {
    color: '#ffffff',
  }
});

const CryptoTable = () => {
  const classes = useStyles();
  const [cryptoData, setCryptoData] = useState([]);
  const [logos, setLogos] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const [tickersResponse, coinsResponse] = await Promise.all([
          axios.get('https://api.coinpaprika.com/v1/tickers'),
          axios.get('https://api.coinpaprika.com/v1/coins')
        ]);

        setCryptoData(tickersResponse.data);

        const logos = coinsResponse.data.reduce((acc, coin) => {
          if (coin.id) {
            acc[coin.id] = `https://static.coinpaprika.com/coin/${coin.id}/logo.png`;
          }
          return acc;
        }, {});
        setLogos(logos);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={classes.cryptoTableContainer}>
      <Typography variant="h4" component="h2" className={classes.cryptoTableTitle}>
        Todas las criptomonedas
      </Typography>
      <Typography variant="subtitle1" className={classes.cryptoTableSubtitle}>
        Ver una lista completa de las criptomonedas activas
      </Typography>
      <TextField
        className={classes.searchField}
        InputProps={{
          className: classes.searchInput,
        }}
        variant="outlined"
        fullWidth
        placeholder="Buscar por nombre o símbolo"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper} className={classes.cryptoTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Logo</TableCell>
              <TableCell className={classes.tableHeadCell}>Moneda</TableCell>
              <TableCell className={classes.tableHeadCell} align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crypto, index) => (
              <TableRow key={crypto.id} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
                <TableCell className={classes.tableCell}>
                  {logos[crypto.id] ? <img src={logos[crypto.id]} alt={crypto.name} style={{ width: 24, height: 24 }} /> : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>{crypto.name} ({crypto.symbol})</TableCell>
                <TableCell className={classes.tableCell} align="right">${crypto.quotes.USD.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Box>
  );
};

export default CryptoTable;
