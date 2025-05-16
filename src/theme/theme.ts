import { createTheme } from "@mui/material/styles";

/**
 * theme
 *
 * Application-wide MUI theme using a dark background
 * and a Viridis-inspired color palette.
 *
 * Features:
 * - Dark background (`black`) for main surfaces
 * - Custom primary color family based on purples
 * - Additional accent colors from the Viridis color map
 * - Uses `"Segoe UI Symbol"` as the global font
 */
const theme = createTheme({
  typography: {
    fontFamily: ['"Segoe UI Symbol"'].join(","),
  },
  palette: {
    background: {
      default: "black",
      paper: "#d8d4d9",
    },
    primary: {
      main: "#440154",
      light: "#e4d1e8",
      dark: "#8f39a3",
    },
    secondary: { main: "#31688E" },
    info: { main: "#FDE725" },
    success: { main: "#35B779" },
  },
});

export default theme;
