import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    backgroundColor: '#12161c',
    color: '#ffffff',
  },
  gridContainer: {
    padding: 20,
  },
});

const CryptoCards = ({ cryptoData }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={2} className={classes.gridContainer}>
        {cryptoData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crypto) => (
          <Grid item xs={12} sm={6} md={4} key={crypto.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5">{crypto.name} ({crypto.symbol})</Typography>
                <Typography>${crypto.quotes.USD.price.toFixed(2)}</Typography>
                <Typography>1h: {crypto.quotes.USD.percent_change_1h.toFixed(2)}%</Typography>
                <Typography>24h: {crypto.quotes.USD.percent_change_24h.toFixed(2)}%</Typography>
                <Typography>7d: {crypto.quotes.USD.percent_change_7d.toFixed(2)}%</Typography>
                <Typography>Volumen 24h: ${crypto.quotes.USD.volume_24h.toLocaleString()}</Typography>
                <Typography>Cap. de mercado: ${crypto.quotes.USD.market_cap.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        component="div"
        count={cryptoData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
      />
    </>
  );
};

export default CryptoCards;
