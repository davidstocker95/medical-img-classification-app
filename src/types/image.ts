import { SLICE_TYPE } from '@niivue/niivue';

export type ColorMap = 'grey' | 'viridis' | 'inferno';

export interface Image {
  id: number;
  name: string;         
  url: string;  
  sliceType: SLICE_TYPE;
  colorMap: ColorMap;
}
