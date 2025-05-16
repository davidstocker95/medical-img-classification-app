// src/utils/__tests__/userUtils.test.ts
import type { Rating } from '../../types';
import { saveUserRatingBrowser } from '../userUtils';

test('adds a new rating to a user', () => {
  const user = { id: 'abc', ratings: [] }; 
  const rating: Rating = { 
    imageId: 0, 
    score: 7,
    comment: 'Test image', 
    tags: ['ambiguous', 'artifact']
  };
 
  const updated = saveUserRatingBrowser(user, rating);
  expect(updated.ratings).toHaveLength(1);
});
