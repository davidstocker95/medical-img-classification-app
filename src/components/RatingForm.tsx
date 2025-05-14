import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { getNextImage } from '../utils/imageUtils';
import { saveUserRating } from '../utils/userUtils';
import type { Rating, User } from '../types';
import RatingBar from './RatingBar';


const ratingFormStyle = {
  // position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: 2,
  bottom: 50,
};

const RatingForm = () => {
  const {
    user,
    setUser,
    image,
    setImage,
    images
  } = useContext(AppContext);

  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState<string>('');

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
      <TextField
        label="Optional Comment"
        multiline
        minRows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <RatingBar setRatingProp={(ratingNumber: number) => setRating(ratingNumber)} />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!rating || rating.rating === null}
      >
        Submit
      </Button>
    </Box>
  );
};

export default RatingForm;
