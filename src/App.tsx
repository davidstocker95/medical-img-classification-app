/**
 * Main application entry point.
 * Applies global theme and renders high-level components.
 */

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";
import NiiVueCanvas from "./components/NiiVueCanvas";
import RatingForm from "./components/RatingForm";
import TerminationDialog from "./components/TerminationDialog";

import { theme } from "./theme";

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
