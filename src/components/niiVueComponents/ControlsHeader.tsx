import { Box, Typography, IconButton } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

interface ControlHeaderProps {
  toggleMinimize: () => void;
  title?: string;
}
/**
 * ControlHeader
 *
 * Displays a title bar and a minimize button for the control panel.
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
  toggleMinimize, title = "Image Controls"
}: ControlHeaderProps) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
    onMouseDown={(e) => e.preventDefault()}
  >
    <Typography variant="body1" sx={{ mb: 1 }}>
      {title}
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
