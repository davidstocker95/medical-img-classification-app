
export const getNiiVueControlsStyles = (
  position: { x: number; y: number }
) => ({
  position: 'absolute',
  top: position.y,
  left: position.x,
  zIndex: 100,
  width: '220px',
  height: '180px',
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
