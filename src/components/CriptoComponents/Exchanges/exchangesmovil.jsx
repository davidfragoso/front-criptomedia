import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography,
  TablePagination, TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cryptoTableContainer: {
    margin: '20px',
    backgroundColor: '#0d1316',
    color: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
  },
  cryptoTableTitle: {
    marginBottom: '10px',
    color: '#FFFFFF',
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
  tableCellName: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
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
    color: '#ffffff',
    borderColor: '#2e2e2e'
  },
  searchInput: {
    color: '#ffffff',
  }
});

const ExchangesMovil = () => {
  const classes = useStyles();
  const [exchangesData, setExchangesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://api.coinpaprika.com/v1/exchanges')
      .then(response => {
        setExchangesData(response.data);
      })
      .catch(error => console.error('Error fetching exchanges data:', error));
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

  const filteredData = exchangesData.filter(exchange =>
    exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exchange.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validData = filteredData.filter(exchange =>
    exchange.links && exchange.links.website && exchange.links.website[0] &&
    exchange.quotes && exchange.quotes.USD &&
    exchange.quotes.USD.reported_volume_24h &&
    exchange.quotes.USD.reported_volume_7d &&
    exchange.quotes.USD.reported_volume_30d
  );

  const displayedData = validData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box className={classes.cryptoTableContainer}>
      <Typography variant="h4" component="h2" className={classes.cryptoTableTitle}>
        Todos los exchanges
      </Typography>
      <Typography variant="subtitle1" className={classes.cryptoTableSubtitle}>
        Ver una lista completa de los exchanges activos
      </Typography>
      <TextField
        className={classes.searchField}
        InputProps={{
          className: classes.searchInput,
        }}
        variant="outlined"
        fullWidth
        placeholder="Buscar por nombre o ID"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ backgroundColor: '#1c242d', color: '#ffffff' }}
      />
      <TableContainer component={Paper} className={classes.cryptoTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Nombre</TableCell>
              <TableCell className={classes.tableHeadCell} align="right">Volumen 24h (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((exchange, index) => (
              <TableRow key={exchange.id} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
                <TableCell className={classes.tableCellName}>{exchange.name}</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {exchange.quotes.USD.reported_volume_24h.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={validData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Box>
  );
};

export default ExchangesMovil;
