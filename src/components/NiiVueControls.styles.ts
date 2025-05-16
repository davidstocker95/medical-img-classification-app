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
  justifyContent: 'center',
  gap: 2,
  backgroundColor: 'background.paper',
  borderRadius: 5,
  p: 2,
  boxShadow: 3,
  cursor: 'move',
});

export const niiVueMinimizedControlsStyles = {
  borderRadius: 3,
  width: '60px',
  height: '60px',
  color: 'primary.main',
  backgroundColor: 'background.paper',
  '&:hover': {
    backgroundColor: 'primary.light',
  },
};