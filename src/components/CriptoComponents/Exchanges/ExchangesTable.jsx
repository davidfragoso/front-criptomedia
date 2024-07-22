import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography,
  TablePagination, TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const useStyles = makeStyles({
  cryptoTableContainer: {
    margin: '20px',
    backgroundColor: '#0d1316', // Light grey background
    color: '#FFFFFF', // Darker text for better contrast on light background
    padding: '20px',
    borderRadius: '8px',
  },
  cryptoTableTitle: {
    marginBottom: '10px',
    color: '#FFFFFF', // Dark grey for text
  },
  cryptoTableSubtitle: {
    marginBottom: '20px',
    color: '#aaaaaa', // Lighter grey for less emphasis
  },
  cryptoTable: {
    backgroundColor: '#0d1316',
     // Consistent light grey background
  },
  tableHeadCell: {
    backgroundColor: '#12161c', // Blue for header cells
    color: '#ffffff',
    borderColor: '#2e2e2e' // White text for contrast
  },
  tableCell: {
    color: '#ffffff',
    borderColor: '#2e2e2e' // Dark grey text for regular cells
  },
  tableCellName: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderColor: '#2e2e2e'
  },
  tableRowOdd: {
    backgroundColor: '#12161c', // Very light grey for odd rows
  },
  tableRowEven: {
    backgroundColor: '#0d1316', // Slightly darker grey for even rows
  },
  pagination: {
    color: '#ffffff',
    backgroundColor: '#12161c', // Blue like the header cells
  },
  selectIcon: {
    color: '#ffffff',
  },
  searchField: {
    marginBottom: '20px',
    backgroundColor: '#333333', // Match even row color for consistency
    borderRadius: '4px',
    color: '#ffffff',
    borderColor: '#2e2e2e'
  },
  searchInput: {
    color: '#ffffff', // Dark grey text for input
  },
  link: {
    color: '#ed6c02', // Darker blue for links
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chartContainer: {
    marginTop: '40px',
  },
  chartTitle: {
color: '#ffffff',
    textAlign: 'center',
    marginBottom: '20px',
  },
});
const ExchangesTable = () => {
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

  const volumeData24h = displayedData.map(exchange => exchange.quotes.USD.reported_volume_24h);
  const volumeData7d = displayedData.map(exchange => exchange.quotes.USD.reported_volume_7d);
  const volumeData30d = displayedData.map(exchange => exchange.quotes.USD.reported_volume_30d);
  const exchangeNames = displayedData.map(exchange => exchange.name);

  const chartData = {
    labels: exchangeNames,
    datasets: [
      {
        label: 'Volumen 24h (USD)',
        data: volumeData24h,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Volumen 7d (USD)',
        data: volumeData7d,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Volumen 30d (USD)',
        data: volumeData30d,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Volúmenes de intercambio de exchanges',
        color: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };

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
              <TableCell className={classes.tableHeadCell} align="right">Website</TableCell>
              <TableCell className={classes.tableHeadCell} align="right">Volumen 24h (USD)</TableCell>
              <TableCell className={classes.tableHeadCell} align="right">Volumen 7d (USD)</TableCell>
              <TableCell className={classes.tableHeadCell} align="right">Volumen 30d (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((exchange, index) => (
              <TableRow key={exchange.id} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
                <TableCell className={classes.tableCellName}>{exchange.name}</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  <a href={exchange.links.website[0]} target="_blank" rel="noopener noreferrer" className={classes.link}>
                    {exchange.links.website[0]}
                  </a>
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {exchange.quotes.USD.reported_volume_24h.toFixed(2)}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {exchange.quotes.USD.reported_volume_7d.toFixed(2)}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {exchange.quotes.USD.reported_volume_30d.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        count={validData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
        classes={{ selectIcon: classes.selectIcon }}
      />
      <Box className={classes.chartContainer}>
        <Typography variant="h5" className={classes.chartTitle}>
          Gráficas de Volúmenes de Intercambio
        </Typography>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default ExchangesTable;