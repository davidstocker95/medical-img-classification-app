import type { Rating, Image, User } from "../types";

/**
 * Creates a default rating template for a given image.
 *
 * @param {number} imageId - The unique identifier of the image to be rated.
 * @returns {Rating} A new Rating object with default values (null score, empty comment, no tags).
 */
export function createDefaultRating(imageId: number): Rating {
  return {
    imageId,
    score: null,
    comment: "",
    tags: [],
  };
}

/**
 * Checks if the user has rated all available images.
 *
 * @param {Image[]} images - The list of all available images.
 * @param {User} user - The user object, which contains a list of ratings.
 * @returns {boolean} True if the user has rated every image, false otherwise.
 */
export function hasUserRatedAllImages(images: Image[], user: User): boolean {
  const ratedIds = new Set(user.ratings.map((r) => r.imageId));
  return images.every((img) => ratedIds.has(img.id));
}
