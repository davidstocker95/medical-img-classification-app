import type { Rating } from "./rating";

/**
 * Represents an anonymous user with persistent ID and ratings history.
 */
export interface User {
  id: string;
  ratings: Rating[];
}
