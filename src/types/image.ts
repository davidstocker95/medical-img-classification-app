import { SLICE_TYPE } from "@niivue/niivue";

/**
 * Describes a medical image that can be rated.
 */
export interface Image {
  id: number;
  name: string;
  url: string;
}

/**
 * Maps user-facing labels to NiiVue slice types.
 */
export const SliceTypeMap: Record<string, SLICE_TYPE> = {
  "Multiplanar": SLICE_TYPE.MULTIPLANAR,
  "3D Render": SLICE_TYPE.RENDER,
  "Axial": SLICE_TYPE.AXIAL,
  "Coronal": SLICE_TYPE.CORONAL,
  "Sagittal": SLICE_TYPE.SAGITTAL,
};

/**
 * Available color maps for image rendering.
 */
export type ColorMap = "viridis" | "inferno" | "gray";
