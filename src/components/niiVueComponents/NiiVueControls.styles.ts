import type { XYPosition, BoxDimensions } from "../../types";

/**
 * Returns style object for draggable control panel.
 * 
 * @param {XYPosition} position - The current position of the panel.
 * @param {BoxDimensions} dimensions - The dimensions of the panel.
 * @returns {object} - The style object for the control panel.
 */
export const getNiiVueControlsStyles = (
  position: XYPosition,
  dimensions: BoxDimensions
) => ({
  position: "absolute",
  top: position.y,
  left: position.x,
  zIndex: 100,
  width: dimensions.width,
  height: dimensions.height,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  backgroundColor: "background.paper",
  borderRadius: 5,
  p: 2,
  boxShadow: 3,
  cursor: "move",
});

/**
 * Styles for minimized panel toggle button.
 */
export const niiVueMinimizedControlsStyles = {
  borderRadius: 3,
  width: "60px",
  height: "60px",
  color: "primary.main",
  backgroundColor: "background.paper",
  "&:hover": {
    backgroundColor: "primary.light",
  },
};
