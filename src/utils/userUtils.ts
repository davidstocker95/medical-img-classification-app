import type { User, Rating } from "../types";

const USER_KEY = "medical_image_classification_user";

/**
 * Retrieves an existing user or creates a new one with a persistent ID.
 */
export function getOrCreateUserBrowser(): User {
  const storedUser = localStorage.getItem(USER_KEY);
  if (storedUser) return JSON.parse(storedUser) as User;

  const newUser: User = {
    id: crypto.randomUUID(),
    ratings: [],
  };

  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
}

/**
 * Saves or updates a user's rating and stores it in localStorage.
 */
export function saveUserRatingBrowser(user: User, rating: Rating): User {
  const isDuplicate = user.ratings.some((r) => r.imageId === rating.imageId);

  const updatedRatings = isDuplicate
    ? user.ratings.map((r) => (r.imageId === rating.imageId ? rating : r))
    : [...user.ratings, rating];

  const updatedUser = { ...user, ratings: updatedRatings };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}

/**
 * Clears all ratings for a user and updates localStorage.
 */
export function resetUserRatingsBrowser(user: User): User {
  const updatedUser = { ...user, ratings: [] };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}
