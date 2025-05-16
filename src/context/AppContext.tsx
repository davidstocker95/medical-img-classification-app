/**
 * AppContext provides shared state across the application (user, image, image list).
 */

import { createContext } from "react";
import type { ContextProps } from "../types/context";

export const AppContext = createContext<ContextProps>({
  user: { id: "", ratings: [] }, // safe placeholder
  setUser: () => {},

  image: undefined,
  setImage: () => {},

  images: [],
  setImages: () => {},
});
