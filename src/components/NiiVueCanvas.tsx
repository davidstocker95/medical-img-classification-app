import { useRef, useEffect, useContext, useState } from 'react';
import { Box } from '@mui/material';
import { Niivue } from '@niivue/niivue';
import { AppContext } from '../context/AppContext';
import NiiVueControls from './NiiVueControls';
import { SliceTypeMap } from '../types';
import type { ColorMap } from '../types';

const NiiVueCanvas = () => {
  const { image } = useContext(AppContext);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nvRef = useRef<Niivue | null>(null);
  const prevImageRef = useRef<string | undefined>(undefined);

  const [sliceType, setSliceType] = useState<string>('Multiplanar');
  const [colorMap, setColorMap] = useState<ColorMap>('viridis');

  useEffect(() => {
    if (!canvasRef.current) return;
    
    if (!nvRef.current) {
      nvRef.current = new Niivue();
      nvRef.current.attachToCanvas(canvasRef.current);
    }

    const typeEnum = SliceTypeMap[sliceType];
    nvRef.current.setSliceType(typeEnum);
  }, [sliceType]);
  
  useEffect(() => {
    if (!nvRef.current) return;
    
    if (nvRef.current.volumes.length > 0) {
      nvRef.current.volumes[0].colorMap = colorMap;
      nvRef.current.updateGLVolume();
      nvRef.current.drawScene();
    }
  }, [colorMap]);
  
  useEffect(() => {
    if (!canvasRef.current || !nvRef.current) return;
    
    if (image?.url) {
      if (prevImageRef.current !== image.url) {
        console.log('Loading new image:', image.url);
        
        if (nvRef.current.volumes.length > 0) {
          nvRef.current.volumes = [];
        }
        
        nvRef.current.loadVolumes([
          {
            url: image.url,
            colorMap,
          },
        ]);
        
        prevImageRef.current = image.url;
      }
    }
  }, [image, colorMap]);

  return (
    <>
      <NiiVueControls
        sliceType={sliceType}
        onSliceTypeChange={setSliceType}
        colorMap={colorMap}
        onColorMapChange={setColorMap}
      />

      <Box 
        sx={{
          display: 'flex',
          height: '40vh',
          width: '100%',
          mt: '16vh',
        }} >
        <canvas ref={canvasRef} />
      </Box>
    </>
  );
};

export default NiiVueCanvas;
