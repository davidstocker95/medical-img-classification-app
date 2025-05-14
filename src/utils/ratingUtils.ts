import type { Rating, Image, User } from '../types';

export function createDefaultRating(imageId: number): Rating {
  return {
		imageId: imageId,
		score: null,
		comment: '',
		tags: [],
	};
};

export function hasUserRatedAllImages(images: Image[], user: User): boolean {
  const ratedIds = new Set(user.ratings.map((r) => r.imageId));
  return images.every((img) => ratedIds.has(img.id));
};
