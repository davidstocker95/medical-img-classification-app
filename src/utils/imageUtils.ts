import { imageUrls } from "../data/images";
import type { Image, User } from "../types";

/**
 * Converts an array of raw image URLs into structured Image objects.
 *
 * Each Image object contains:
 * - id: a unique numeric identifier (based on the index in the array)
 * - name: the filename extracted from the URL, or "Unknown" if not available
 * - url: the original image URL
 *
 * @returns {Image[]} An array of Image objects with id, name, and url properties.
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
 * Finds the next image that the user has not yet rated.
 *
 * @param {Image[]} images - The list of all available images.
 * @param {User} user - The user object, which contains a list of rated image IDs.
 * @returns {Image | undefined} The first unrated Image object, or undefined if all images are rated.
 */
export function getNextImage(images: Image[], user: User): Image | undefined {
  const ratedIds = new Set(user.ratings.map((r) => r.imageId));
  return images.find((img) => !ratedIds.has(img.id));
}
