import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/Header';
import NiiVueCanvas from './components/NiiVueCanvas';
import RatingForm from './components/RatingForm';

const theme = createTheme();

function App() {
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <NiiVueCanvas />
      <RatingForm />
    </ThemeProvider>
  );
}

export default App;
