import type { XYPosition, BoxDimensions } from "../types";

export const getNiiVueControlsStyles = (
  position: XYPosition,
  dimensions: BoxDimensions,
) => ({
  position: 'absolute',
  top: position.y,
  left: position.x,
  zIndex: 100,
  width: dimensions.width,
  height: dimensions.height,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  backgroundColor: 'background.paper',
  borderRadius: 2,
  p: 2,
  boxShadow: 3,
  cursor: 'move',
});
