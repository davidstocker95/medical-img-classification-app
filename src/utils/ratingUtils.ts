import type { Rating, Image, User } from "../types";

/**
 * Creates a default rating template for a given image.
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
 */
export function hasUserRatedAllImages(images: Image[], user: User): boolean {
  const ratedIds = new Set(user.ratings.map((r) => r.imageId));
  return images.every((img) => ratedIds.has(img.id));
}
