import { useState, useMemo } from 'react';
import type { User, Image } from '../types';

import { AppContext } from './AppContext';
import { getOrCreateUser } from '../utils/userUtils';
import { getImages, getNextImage } from '../utils/imageUtils';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ user, setUser ] = useState<User>(getOrCreateUser());
  const [ images, setImages ] = useState<Image[]>(getImages());
  const [ image, setImage ] = useState<Image | undefined>(getNextImage(images, user));

  const contextValue = useMemo(() => (
    { user, setUser, image, setImage, images, setImages }), 
    [ user, setUser, image, setImage, images, setImages]
  );
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
