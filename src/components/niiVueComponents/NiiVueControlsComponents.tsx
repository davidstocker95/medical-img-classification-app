import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import TuneIcon from "@mui/icons-material/Tune";

import { niiVueMinimizedControlsStyles } from "./NiiVueControls.styles";

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
      sx={niiVueMinimizedControlsStyles}
      onClick={(e) => {
        e.stopPropagation();
        toggleMinimize();
      }}
    >
      <TuneIcon />
    </IconButton>
  </Box>
);

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

type ControlSelectorProps<T extends string> = {
  label: string;
  value: T;
  onChange: (val: T) => void;
  options: T[];
};

/**
 * ControlSelector
 *
 * Generic dropdown component for selecting values (e.g., slice type, color map).
 *
 * Features/Responsibilities:
 * - Renders a labeled select input with options
 * - Updates selected value using callback
 * - Prevents drag interference on interaction
 *
 * Props:
 * @param {string} label - Label for the dropdown control
 * @param {T} value - Currently selected option
 * @param {(val: T) => void} onChange - Callback to update selection
 * @param {T[]} options - List of selectable values
 *
 * Events:
 * - onChange: Updates value via `onChange` callback
 * - onMouseDown: Stops event propagation to prevent dragging interference
 *
 * Notes:
 * - Generic over string literals to support strongly typed values
 */
export const ControlSelector = <T extends string>({
  label,
  value,
  onChange,
  options,
}: ControlSelectorProps<T>) => (
  <FormControl size="small" fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      onMouseDown={(e) => e.stopPropagation()}
      label={label}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
