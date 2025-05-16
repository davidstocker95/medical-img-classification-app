import { Box, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { useDraggablePanel } from '../hooks/useDraggablePanel';
import { getNiiVueControlsStyles } from './NiiVueControls.styles';
import { SliceTypeMap } from '../types';
import type { ColorMap, XYPosition, BoxDimensions } from '../types';

type Props = {
  sliceType: string;
  onSliceTypeChange: (val: string) => void;
  colorMap: ColorMap;
  onColorMapChange: (val: ColorMap) => void;
};

const colorMaps: ColorMap[] = ['viridis', 'inferno', 'gray'];

const NiiVueControls = ({
  sliceType,
  onSliceTypeChange,
  colorMap,
  onColorMapChange,
}: Props) => {  
  const panelDimension: BoxDimensions = { width: 220, height: 180 };
  const initialPosition: XYPosition = { 
    x: window.innerWidth - panelDimension.width - 50,
    y: window.innerHeight - panelDimension.height - 50, 
  };
  const { position, handleMouseDown } = useDraggablePanel(initialPosition, panelDimension);

  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={getNiiVueControlsStyles(position)}
    >
      <Typography 
        variant="body1" 
        sx={{ mb: 1 }} 
        onMouseDown={(e) => e.preventDefault()}
      >
        Image Controls
      </Typography>

      <FormControl size="small" fullWidth>
        <InputLabel>Slice Type</InputLabel>
        <Select 
          value={sliceType} 
          onChange={(e) => onSliceTypeChange(e.target.value)} 
          onMouseDown={(e) => e.stopPropagation()}
          label="Slice Type"
        >
          {Object.keys(SliceTypeMap).map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Color Map</InputLabel>
        <Select 
          value={colorMap} 
          onChange={(e) => onColorMapChange(e.target.value)} 
          onMouseDown={(e) => e.stopPropagation()}
          label="Color Map"
        >
          {colorMaps.map((map) => (
            <MenuItem key={map} value={map}>
              {map}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NiiVueControls;
