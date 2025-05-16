import { SLICE_TYPE } from '@niivue/niivue';

export interface Image {
  id: number;
  name: string;         
  url: string;  
}

export const SliceTypeMap: Record<string, SLICE_TYPE> = {
  'Axial': SLICE_TYPE.AXIAL,
  'Coronal': SLICE_TYPE.CORONAL,
  'Sagittal': SLICE_TYPE.SAGITTAL,
  'Multiplanar': SLICE_TYPE.MULTIPLANAR,
  '3DRender': SLICE_TYPE.RENDER,
};

export type ColorMap = 'gray' | 'viridis' | 'inferno';
