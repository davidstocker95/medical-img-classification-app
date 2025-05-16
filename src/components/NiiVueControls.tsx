import { useState } from "react";
import { Box } from "@mui/material";

import { useDraggablePanel } from "../hooks/useDraggablePanel";
import { getNiiVueControlsStyles } from "./NiiVueControls.styles";
import { SliceTypeMap } from "../types";
import type { ColorMap, XYPosition, BoxDimensions } from "../types";
import {
  ControlMinimized,
  ControlHeader,
  ControlSelector,
} from "./NiiVueControlsComponents";

type Props = {
  sliceType: string;
  onSliceTypeChange: (val: string) => void;
  colorMap: ColorMap;
  onColorMapChange: (val: ColorMap) => void;
};

const colorMaps: ColorMap[] = ["viridis", "inferno", "gray"];

const fullDimension: BoxDimensions = { width: 220, height: 180 };
const minimizedDimension: BoxDimensions = { width: 92, height: 92 };

/**
 * NiiVueControls
 * 
 * A draggable, minimizable control panel for slice view and colormap selection in NIfTI image viewers.
 * 
 * Features/Responsibilities:
 * - Allows the user to select different slice views (e.g., axial, coronal)
 * - Enables switching between predefined color maps for visualization
 * - Supports minimizing the panel to a compact icon/button
 * - Draggable interface with position clamping via `useDraggablePanel`
 * 
 * Props:
 * @param {string} sliceType - The currently selected slice view type
 * @param {(val: string) => void} onSliceTypeChange - Callback to update the selected slice type
 * @param {ColorMap} colorMap - The currently active color map
 * @param {(val: ColorMap) => void} onColorMapChange - Callback to update the color map
 * 
 * State:
 * - isMinimized: Toggles whether the control panel is collapsed or fully visible
 * 
 * Events:
 * - onMouseDown: Captures drag events to reposition the panel
 * - toggleMinimize: Handles toggling between minimized and full panel views
 * 
 * Notes:
 * - Uses `useDraggablePanel` hook to maintain and update panel position
 * - Adjusts position dynamically to accommodate dimension changes during minimize/expand
 */

const NiiVueControls = ({
  sliceType,
  onSliceTypeChange,
  colorMap,
  onColorMapChange,
}: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate initial position near bottom-right
  const initialMargin = Math.min(window.innerWidth, window.innerHeight) / 20;
  const initialPosition: XYPosition = {
    x: window.innerWidth - fullDimension.width - initialMargin,
    y: window.innerHeight - fullDimension.height - initialMargin,
  };

  // Use draggable panel hook to manage position and size
  const dimensions = isMinimized ? minimizedDimension : fullDimension;
  const { position, handleMouseDown, adjustPositionForSizeChange } =
    useDraggablePanel(initialPosition, dimensions);

  // Adjust position when the panel is minimized or expanded
  const toggleMinimize = () => {
    const from = isMinimized ? minimizedDimension : fullDimension;
    const to = isMinimized ? fullDimension : minimizedDimension;
    adjustPositionForSizeChange(from, to);
    setIsMinimized(!isMinimized);
  };

  return (
    <Box onMouseDown={handleMouseDown} sx={getNiiVueControlsStyles(position, dimensions)}>
      {isMinimized ? (
        <ControlMinimized toggleMinimize={toggleMinimize} />
      ) : (
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
