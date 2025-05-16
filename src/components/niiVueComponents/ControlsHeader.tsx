import { Box, Typography, IconButton } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

/**
 * ControlHeader
 *
 * Displays a title bar and a minimize button.
 *
 * Features/Responsibilities:
 * - Shows a title label for the controls section
 * - Provides a minimize button to collapse the panel
 *
 * Props:
 * @param {() => void} toggleMinimize - Callback to minimize the panel
 *
 * Events:
 * - onClick: Triggers `toggleMinimize` and stops event propagation
 *
 * Notes:
 * - `onMouseDown` is prevented to allow drag without interfering with the header
 */

export const ControlHeader = ({
  toggleMinimize,
}: {
  toggleMinimize: () => void;
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
    onMouseDown={(e) => e.preventDefault()}
  >
    <Typography variant="body1" sx={{ mb: 1 }}>
      Image Controls
    </Typography>
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        toggleMinimize();
      }}
    >
      <FullscreenExitIcon />
    </IconButton>
  </Box>
);
