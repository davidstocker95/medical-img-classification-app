import { useRef, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { Niivue } from '@niivue/niivue';
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

      // nvRef.current.opts.sliceType = nvRef.current.sliceTypeMultiplanar; // set to a single view
      nvRef.current.setSliceType(nvRef.current.sliceTypeMultiplanar); // choose axial/sagittal/coronal

    }

    nvRef.current.loadVolumes([
      {
        url: image.url,
        colorMap: 'viridis',
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
