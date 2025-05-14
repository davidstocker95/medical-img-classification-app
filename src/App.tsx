import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Header from './components/Header';
import NiiVueCanvas from './components/NiiVueCanvas';
import RatingForm from './components/RatingForm';

import { theme } from './theme';
import TerminationDialog from './components/TerminationDialog';

function App() {
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <NiiVueCanvas />
      <RatingForm />
      <TerminationDialog />
    </ThemeProvider>
  );
}

export default App;
