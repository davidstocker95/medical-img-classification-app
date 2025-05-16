import { Box, IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

/**
 * Styles for minimized panel toggle button.
 */
export const minimizedControlIconStyle = {
  borderRadius: 3,
  width: "60px",
  height: "60px",
  color: "primary.main",
  backgroundColor: "background.paper",
  "&:hover": {
    backgroundColor: "primary.light",
  },
};

/**
 * ControlMinimized
 *
 * Renders a toggle button used to restore the full control panel.
 *
 * Features/Responsibilities:
 * - Shows a single button with an icon when the panel is minimized
 * - Calls a callback to restore the full control panel
 *
 * Props:
 * @param {() => void} toggleMinimize - Callback to restore the panel view
 *
 * Events:
 * - onClick: Triggers `toggleMinimize` and stops event propagation
 *
 * Notes:
 * - `onMouseDown` is prevented to avoid triggering drag logic on the wrapper
 */

export const ControlMinimized = ({
  toggleMinimize,
}: {
  toggleMinimize: () => void;
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    onMouseDown={(e) => e.preventDefault()}
  >
    <IconButton
      size="large"
      sx={minimizedControlIconStyle}
      onClick={(e) => {
        e.stopPropagation();
        toggleMinimize();
      }}
    >
      <TuneIcon />
    </IconButton>
  </Box>
);
