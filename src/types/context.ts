import type { Dispatch } from "react";
import type { Image, User } from "./index";

/**
 * ContextProps
 *
 * Structure for the global application context values used in AppContext.
 *
 * Fields:
 * - user: The current user object (with ratings)
 * - setUser: Setter for updating the user
 * - image: The currently active image (optional)
 * - setImage: Setter for updating the active image
 * - images: List of all images to be rated
 * - setImages: Setter for updating the image list
 */
export interface ContextProps {
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;

  image?: Image;
  setImage: Dispatch<React.SetStateAction<Image | undefined>>;

  images: Image[];
  setImages: Dispatch<React.SetStateAction<Image[]>>;
}
