import { useState, useEffect, useContext } from 'react';
import { Box, Button, Tooltip } from '@mui/material';

import { AppContext } from '../context/AppContext';
import { getNextImage } from '../utils/imageUtils';
import { saveUserRating } from '../utils/userUtils';
import type { Rating, User } from '../types';
import ScoreBar from './ScoreBar';
import RatingComment from './RatingComment';
import { ratingFormStyle } from './RatingForm.styles';
import { createDefaultRating } from '../utils/ratingUtils';

const RatingForm = () => {
  const { user, setUser, image, setImage, images } = useContext(AppContext);
  const [rating, setRating] = useState<Rating | null>(null);

  const isSubmitDisabled = rating?.score == null;

  // Set up rating when image changes
  useEffect(() => {
    if (image) {
      setRating(createDefaultRating(image.id));
    }
  }, [image]);

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    setUser((prevUser: User) => saveUserRating(prevUser, rating));
    setImage(getNextImage(images, user));
  };

  // Generic updater for rating fields
  const setRatingField = <K extends keyof Rating>(key: K, value: Rating[K]) => {
    setRating((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  return (
    <>
      {image && rating && (
        <Box sx={ratingFormStyle}>
          <RatingComment
            comment={rating.comment}
            setComment={(c) => setRatingField('comment', c)}
            tags={rating.tags}
            setTags={(t) => setRatingField('tags', t)}
          />

          <ScoreBar
            currentScore={rating.score}
            setScore={(s) => setRatingField('score', s)}
          />

          <Tooltip
            title={isSubmitDisabled ? 'Select a rating first' : 'Submit your rating'}
            placement="right"
            enterDelay={500}
          >
            <span style={{ display: 'inline-flex' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                sx={{ borderRadius: 3, boxShadow: 5, height: '60px', typography: 'body1' }}
              >
                Submit
              </Button>
            </span>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default RatingForm;
