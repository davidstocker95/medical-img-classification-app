import { useRef, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { Niivue, SLICE_TYPE } from '@niivue/niivue';
import { AppContext } from '../context/AppContext';

const NiiVueCanvas = () => {
  const { image } = useContext(AppContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nvRef = useRef<Niivue | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !image?.url) return;

    if (!nvRef.current) {
      nvRef.current = new Niivue();
      nvRef.current.attachToCanvas(canvasRef.current);
      nvRef.current.setSliceType(image.sliceType);
    }

    nvRef.current.loadVolumes([
      {
        url: image.url,
        colorMap: image.colorMap
      },
    ]);

    return () => {
      nvRef.current?.loadVolumes([]);
    };
  }, [image]);

  return (
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
	);
};

export default NiiVueCanvas;
