import type { User, Rating } from "../types";

const USER_KEY = "medical_image_classification_user";

/**
 * Retrieves an existing user from localStorage or creates a new user with a unique ID.
 *
 * @returns {User} The retrieved or newly created User object, including an empty ratings array.
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
 * Adds a new rating or updates an existing rating for a given image,
 * then saves the updated user object to localStorage.
 *
 * @param {User} user - The user who is providing the rating.
 * @param {Rating} rating - The rating to be added or updated.
 * @returns {User} The updated User object with the new or modified rating included.
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
 * Removes all ratings from a user's profile and persists the changes to localStorage.
 *
 * @param {User} user - The user whose ratings are to be cleared.
 * @returns {User} A new User object with an empty ratings array.
 */
export function resetUserRatingsBrowser(user: User): User {
  const updatedUser = { ...user, ratings: [] };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}
