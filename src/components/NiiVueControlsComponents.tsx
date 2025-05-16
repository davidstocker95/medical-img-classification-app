import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton
} from '@mui/material';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import TuneIcon from '@mui/icons-material/Tune';

import { niiVueMinimizedControlsStyles } from './NiiVueControls.styles';

export const ControlMinimized = ({ toggleMinimize }: { toggleMinimize: () => void }) => (
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

export const ControlHeader = ({ toggleMinimize }: { toggleMinimize: () => void }) => (
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
