import { useRef, useEffect, useContext, useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, Typography, IconButton, Tooltip } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Niivue, SLICE_TYPE } from '@niivue/niivue';
import { AppContext } from '../context/AppContext';

const sliceTypes: SLICE_TYPE[] = [
  SLICE_TYPE.MULTIPLANAR,
  SLICE_TYPE.AXIAL,
  SLICE_TYPE.CORONAL,
  SLICE_TYPE.SAGITTAL,
  SLICE_TYPE.RENDER
];

const sliceTypeLabels: Record<SLICE_TYPE, string> = {
  [SLICE_TYPE.AXIAL]: 'Axial',
  [SLICE_TYPE.CORONAL]: 'Coronal',
  [SLICE_TYPE.SAGITTAL]: 'Sagittal',
  [SLICE_TYPE.MULTIPLANAR]: 'Multiplanar',
  [SLICE_TYPE.RENDER]: '3D Render',
};

const colorMaps = ['gray', 'viridis', 'inferno'];

const NiiVueCanvas = () => {
  const { image } = useContext(AppContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nvRef = useRef<Niivue | null>(null);

  const [sliceType, setSliceType] = useState<SLICE_TYPE>(SLICE_TYPE.MULTIPLANAR);
  const [colorMap, setColorMap] = useState<'gray' | 'viridis' | 'inferno'>('gray');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Drag state
  const [position, setPosition] = useState({ top: 80, left: window.innerWidth - 250 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !image?.url) return;

    if (!nvRef.current) {
      nvRef.current = new Niivue();
      nvRef.current.attachToCanvas(canvasRef.current);
    }

    nvRef.current.setSliceType(sliceType);
    nvRef.current.loadVolumes([
      {
        url: image.url,
        colorMap,
      },
    ]);
  }, [image, sliceType, colorMap]);

  const handleSliceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as SLICE_TYPE;
    setSliceType(value);
    nvRef.current?.setSliceType(value);
  };

  const handleColorMapChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as 'gray' | 'viridis' | 'inferno';
    setColorMap(value);
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };


  const adjustZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.2), 3); // Clamp between 0.2x and 3x
    setZoomLevel(newZoom);
    nvRef.current?.setScale(newZoom);
  };

  return (
    <>
      {/* Draggable Controls Box */}
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 100,
          width: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 2,
          boxShadow: 3,
          cursor: 'move',
        }}
      >
        <Typography variant="body-1" sx={{ mb: 1 }} onMouseDown={(e) => e.preventDefault()}>
          NiiVue Controls
        </Typography>
        <FormControl size="small" fullWidth>
          <InputLabel>Slice Type</InputLabel>
          <Select value={sliceType} onChange={handleSliceTypeChange} label="Slice Type">
            {sliceTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {sliceTypeLabels[type]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel>Color Map</InputLabel>
          <Select value={colorMap} onChange={handleColorMapChange} label="Color Map">
            {colorMaps.map((map) => (
              <MenuItem key={map} value={map}>
                {map}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          <Tooltip title="Zoom Out">
            <IconButton size="small" onClick={() => adjustZoom(-0.1)}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom In">
            <IconButton size="small" onClick={() => adjustZoom(0.1)}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Canvas */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh',
          width: '100%',
          mt: '100px',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: 'auto',
            height: 'auto',
            display: 'block',
          }}
        />
      </Box>
    </>
  );
};

export default NiiVueCanvas;
