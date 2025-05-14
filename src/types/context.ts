import type { Dispatch } from 'react';
import type { Image, User } from './index';

export interface ContextProps {
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;

  image?: Image;
  setImage: Dispatch<React.SetStateAction<Image | undefined>>;

  images: Image[];
  setImages: Dispatch<React.SetStateAction<Image[]>>;
}
