
export interface Rating {
  imageId: number;
  score: number | null;      
  comment: string;
  tags: RatingTag[];           
}

export type RatingTag = 'ambiguous' | 'artifact' | 'non-pathalogical' ;
