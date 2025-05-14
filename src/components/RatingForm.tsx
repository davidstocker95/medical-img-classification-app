import { useState, useEffect, useContext } from 'react';
import { Box, Button } from '@mui/material';
import Tooltip from "@mui/material/Tooltip";

import { AppContext } from '../context/AppContext';
import { getNextImage } from '../utils/imageUtils';
import { saveUserRating } from '../utils/userUtils';
import type { Rating, User } from '../types';
import RatingBar from './RatingBar';
import RatingComment from './RatingComment';
import { ratingFormStyle } from './RatingForm.styles';

const RatingForm = () => {
  const {
    user,
    setUser,
    image,
    setImage,
    images
  } = useContext(AppContext);

  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState<string>('sdf');

  const isSubmitDisabled = !rating || rating.rating === null;

  useEffect(() => {
    if (image) {
      setRating({ imageId: image.id, rating: null });
      setComment('');
    }
  }, [image]);

  const handleSubmit = () => {
    if (!rating || rating.rating === null) return;

    const fullRating: Rating = {
      ...rating,
      comment,
    };

    setUser((prevUser: User) => saveUserRating(prevUser, fullRating));
    setImage(getNextImage(images, user));
  };
  
  return (
    <Box sx={ratingFormStyle}>
      <RatingComment comment={comment} setComment={setComment} />
      <RatingBar
        currentRating={rating ? rating.rating : null}
        setRating={(ratingNumber: number) =>
          setRating((prev) =>
            prev ? { ...prev, rating: ratingNumber } : null
          )
        }
      />
      <Tooltip 
        title={isSubmitDisabled ? "Select a rating first": "Submit your rating"}
        placement="right" 
        enterDelay={500}
      >
        <span style={{ display: 'inline-flex' }}> {/* Fixes Tooltip on disabled buttons */}
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
  );
};

export default RatingForm;
