import { createContext } from "react";
import type { ContextProps } from "../types/context";

/**
 * AppContext
 *
 * Provides shared state across the application, including:
 * - The current user and their ratings
 * - The currently selected image
 * - The list of available images
 *
 * Context Values:
 * - user: Current user object
 * - setUser: Updates the user
 * - image: Currently displayed image
 * - setImage: Updates the displayed image
 * - images: List of all images
 * - setImages: Updates the image list
 */
export const AppContext = createContext<ContextProps>({
  user: { id: "", ratings: [] },
  setUser: () => {},

  image: undefined,
  setImage: () => {},

  images: [],
  setImages: () => {},
});
