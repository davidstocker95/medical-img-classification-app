import { imageUrls } from "../data/images";
import type { Image, User } from "../types";

/**
 * Converts raw image URLs into structured Image objects.
 */
export function getImages(): Image[] {
  return imageUrls.map((url, index) => {
    const name = url.split("/").pop() ?? "Unknown";
    return {
      id: index,
      name,
      url,
    };
  });
}

/**
 * Returns the next unrated image for a given user.
 */
export function getNextImage(images: Image[], user: User): Image | undefined {
  const ratedIds = new Set(user.ratings.map((r) => r.imageId));
  return images.find((img) => !ratedIds.has(img.id));
}
