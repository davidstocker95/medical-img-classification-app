import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Use black as the default background color and use viridis color palette
  // for the primary color scheme
  palette: {
    background: {
      default: 'black', 
      paper: '#f0ebf0',
    },
    primary: { 
      main: '#440154',
      light: '#f2dcf7',
      dark: '#7e009c',
    },
    secondary: { main: '#31688E' },
    info: { main: '#FDE725' },
    success: { main: '#35B779' },
  },
});

export default theme;
