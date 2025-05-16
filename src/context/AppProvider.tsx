/**
 * AppProvider wraps the application in shared state context (user, current image, image list).
 */

import { useState, useMemo } from "react";
import type { User, Image } from "../types";

import { AppContext } from "./AppContext";
import { getOrCreateUserBrowser } from "../utils/userUtils";
import { getImages, getNextImage } from "../utils/imageUtils";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(getOrCreateUserBrowser());
  const [images, setImages] = useState<Image[]>(getImages());
  const [image, setImage] = useState<Image | undefined>(getNextImage(images, user));

  const contextValue = useMemo(
    () => ({ user, setUser, image, setImage, images, setImages }),
    [user, image, images]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
