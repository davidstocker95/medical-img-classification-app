import { createContext } from 'react';
import type { ContextProps } from '../types/context';

import { getOrCreateUser } from '../utils/userUtils';
import { getImages } from '../utils/imageUtils';

const defaultContextProps: ContextProps = {
  user: getOrCreateUser(),
  setUser: () => {},
  
  image: undefined,
  setImage: () => {},

  images: getImages(),
  setImages: () => {},
};

export const AppContext = createContext<ContextProps>(defaultContextProps);
