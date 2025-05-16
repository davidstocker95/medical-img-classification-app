import { SLICE_TYPE } from '@niivue/niivue';

export interface Image {
  id: number;
  name: string;         
  url: string;  
}

export const SliceTypeMap: Record<string, SLICE_TYPE> = {
  'Multiplanar': SLICE_TYPE.MULTIPLANAR,
  '3D Render': SLICE_TYPE.RENDER,
  'Axial': SLICE_TYPE.AXIAL,
  'Coronal': SLICE_TYPE.CORONAL,
  'Sagittal': SLICE_TYPE.SAGITTAL,
};

export type ColorMap = 'viridis' | 'inferno' |'gray';
