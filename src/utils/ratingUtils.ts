import type { Rating } from '../types';

export function createDefaultRating(imageId: number): Rating {
  return {
		imageId: imageId,
		score: null,
		comment: '',
		tags: [],
	};
};
