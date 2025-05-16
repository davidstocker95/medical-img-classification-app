import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";
import ImageCanvas from "./components/niiVueComponents/ImageCanvas";
import RatingForm from "./components/RatingForm";
import TerminationDialog from "./components/TerminationDialog";

import { theme } from "./theme";

/**
 * App
 *
 * Main application layout and composition.
 * Applies global Material UI theme and renders core components.
 *
 * Features:
 * - Global theme application using MUI ThemeProvider
 * - Baseline styling with CssBaseline
 * - High-level components for header, image viewer, rating form, and termination dialog
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ImageCanvas />
      <RatingForm />
      <TerminationDialog />
    </ThemeProvider>
  );
}

export default App;
