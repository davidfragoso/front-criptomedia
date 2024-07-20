import React from 'react';
import { useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import ExchangesTable from './ExchangesTable';
import ExchangesMovil from './exchangesmovil';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const ExchangesComponent = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      {isMobile ? <ExchangesMovil /> : <ExchangesTable />}
    </ThemeProvider>
  );
};

export default ExchangesComponent;
