import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Symbol"',
    ].join(','),
  },
  // Use black as the default background color and use viridis color palette
  // for the primary color scheme
  palette: {
    background: {
      default: 'black', 
      paper: '#d8d4d9',
    },
    primary: { 
      main: '#440154',
      light: '#e4d1e8',
      dark: '#8f39a3',
    },
    secondary: { main: '#31688E' },
    info: { main: '#FDE725' },
    success: { main: '#35B779' },
  },
});

export default theme;
