import { useState } from 'react';
import { Box } from '@mui/material';

import { useDraggablePanel } from '../hooks/useDraggablePanel';
import { getNiiVueControlsStyles } from './NiiVueControls.styles';
import { SliceTypeMap } from '../types';
import type { ColorMap, XYPosition, BoxDimensions } from '../types';
import { ControlMinimized, ControlHeader, ControlSelector } from './NiiVueControlsComponents';

type Props = {
  sliceType: string;
  onSliceTypeChange: (val: string) => void;
  colorMap: ColorMap;
  onColorMapChange: (val: ColorMap) => void;
};

const colorMaps: ColorMap[] = ['viridis', 'inferno', 'gray'];

const fullDimension: BoxDimensions = { width: 220, height: 180 };
const minimizedDimension: BoxDimensions = { width: 92, height: 92 };

const NiiVueControls = ({
  sliceType,
  onSliceTypeChange,
  colorMap,
  onColorMapChange,
}: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const initialMargin = Math.min(window.innerWidth, window.innerHeight) / 20;
  const initialPosition: XYPosition = {
    x: window.innerWidth - fullDimension.width - initialMargin,
    y: window.innerHeight - fullDimension.height - initialMargin,
  };

  const dimensions = isMinimized ? minimizedDimension : fullDimension;
  const { position, handleMouseDown, adjustPositionForSizeChange } =
    useDraggablePanel(initialPosition, dimensions);

  const toggleMinimize = () => {
    const from = isMinimized ? minimizedDimension : fullDimension;
    const to = isMinimized ? fullDimension : minimizedDimension;
    adjustPositionForSizeChange(from, to);
    setIsMinimized(!isMinimized);
  };

  return (
    <Box onMouseDown={handleMouseDown} sx={getNiiVueControlsStyles(position, dimensions)}>
      {isMinimized
        ? <ControlMinimized toggleMinimize={toggleMinimize} />
        : (
          <>
            <ControlHeader toggleMinimize={toggleMinimize} />
            <ControlSelector
              label="Slice Type"
              value={sliceType}
              onChange={onSliceTypeChange}
              options={Object.keys(SliceTypeMap)}
            />
            <ControlSelector<ColorMap>
              label="Color Map"
              value={colorMap}
              onChange={onColorMapChange}
              options={colorMaps}
            />
          </>
        )}
    </Box>
  );
};

export default NiiVueControls;
