import { useState, useMemo } from "react";
import type { User, Image } from "../types";

import { AppContext } from "./AppContext";
import { getOrCreateUserBrowser } from "../utils/userUtils";
import { getImages, getNextImage } from "../utils/imageUtils";

/**
 * AppProvider
 *
 * Wraps the application with global context for user, current image, and image list.
 *
 * Features:
 * - Initializes user from localStorage
 * - Loads available images
 * - Selects the next unrated image
 *
 * Context Values Provided:
 * - user, setUser
 * - image, setImage
 * - images, setImages
 *
 * Props:
 * @param {ReactNode} children - The application content wrapped by the provider
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(getOrCreateUserBrowser());
  const [images, setImages] = useState<Image[]>(getImages());
  const [image, setImage] = useState<Image | undefined>(getNextImage(images, user));

  // Memoize context value to prevent unnecessary re-renders
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
