import { useRef, useEffect, useContext, useState } from "react";
import { Box } from "@mui/material";
import { Niivue } from "@niivue/niivue";

import { AppContext } from "../../context/AppContext";
import Controls from "./Controls";
import { SliceTypeMap } from "../../types";
import type { ColorMap } from "../../types";

/**
 * ImageCanvas
 *
 * Renders the NiiVue viewer inside a canvas element and overlays a draggable
 * control panel for adjusting slice type and color map.
 *
 * Responsibilities:
 * - Initialize and attach Niivue instance on first render.
 * - Load image volume when it changes.
 * - Update slice type and colormap via controls.
 *
 * Context:
 * - Reads `image` from AppContext.
 */
const ImageCanvas = () => {
  const { image } = useContext(AppContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nvRef = useRef<Niivue | null>(null);
  const prevImageRef = useRef<string | undefined>(undefined);

  const [sliceType, setSliceType] = useState<string>("Multiplanar");
  const [colorMap, setColorMap] = useState<ColorMap>("viridis");

  // Setup Niivue on first render and update slice type when changed
  useEffect(() => {
    if (!canvasRef.current) return;

    if (!nvRef.current) {
      nvRef.current = new Niivue();
      nvRef.current.attachToCanvas(canvasRef.current);
    }

    const typeEnum = SliceTypeMap[sliceType];
    nvRef.current.setSliceType(typeEnum);
  }, [sliceType]);

  // Update colormap for current volume when changed
  useEffect(() => {
    if (!nvRef.current) return;

    if (nvRef.current.volumes.length > 0) {
      nvRef.current.volumes[0].colorMap = colorMap;
      nvRef.current.updateGLVolume();
      nvRef.current.drawScene();
    }
  }, [colorMap]);

  // Load a new image volume when image changes
  useEffect(() => {
    if (!canvasRef.current || !nvRef.current) return;

    if (image?.url && prevImageRef.current !== image.url) {
      if (nvRef.current.volumes.length > 0) {
        nvRef.current.volumes = []; // clear old volume
      }

      nvRef.current.loadVolumes([
        {
          url: image.url,
          colorMap,
        },
      ]);

      prevImageRef.current = image.url;
    }
  }, [image, colorMap]);

  return (
    <>
      <Controls
        sliceType={sliceType}
        onSliceTypeChange={setSliceType}
        colorMap={colorMap}
        onColorMapChange={setColorMap}
      />
      <Box
        sx={{
          display: "flex",
          height: "65vh",
          width: "100%",
          mt: "6vh",
        }}
      >
        <canvas ref={canvasRef} />
      </Box>
    </>
  );
};

export default ImageCanvas;
