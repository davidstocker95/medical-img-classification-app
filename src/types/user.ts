import type { Rating } from './rating';

export interface User {
  id: string;               // persistent ID stored in localStorage
  ratings: Rating[];        // array of ratings
}
