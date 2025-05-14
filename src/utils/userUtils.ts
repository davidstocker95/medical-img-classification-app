import type { User, Rating } from '../types/index';

const USER_KEY = 'medical_image_classification_user';

export function getOrCreateUser(): User {
  const storedUser = localStorage.getItem(USER_KEY);
  if (storedUser) return JSON.parse(storedUser) as User;

  const newUser: User = {
    id: crypto.randomUUID(),
		ratings: []
  };

  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
}

export function saveUserRating(user: User, rating: Rating): User {
  const isDuplicateRating = user.ratings.some(r => r.imageId === rating.imageId);

  let updatedRatings: Rating[];
  if (isDuplicateRating) {
    updatedRatings = user.ratings.map(r =>
      r.imageId === rating.imageId ? rating : r
    );
  } else {
    updatedRatings = [...user.ratings, rating];
  }

  const updatedUser = { ...user, ratings: updatedRatings };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

  return updatedUser;
}
