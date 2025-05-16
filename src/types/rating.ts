/**
 * Describes a user's score and annotations for an image.
 */
export interface Rating {
  imageId: number;
  score: number | null;
  comment: string;
  tags: RatingTag[];
}

/**
 * Optional tags users can assign to an image.
 */
export type RatingTag = "ambiguous" | "artifact" | "non-pathalogical";
