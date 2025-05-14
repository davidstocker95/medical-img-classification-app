import { useState, useEffect, useContext } from 'react';
import { Box, Button } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { getNextImage } from '../utils/imageUtils';
import { saveUserRating } from '../utils/userUtils';
import type { Rating, User } from '../types';
import RatingBar from './RatingBar';
import RatingComment from './RatingComment';

const ratingFormStyle = {
  position: 'fixed',            
  bottom: 32,                  
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: 7,
  width: '100%',               
  maxWidth: '900px',
  padding: '16px 32px 16px 32px',
  zIndex: 10,                  
  borderRadius: 5,
  bgcolor: 'background.paper',
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
  const [comment, setComment] = useState<string>('sdf');

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!rating || rating.rating === null}
        sx={{ borderRadius: 3, boxShadow: 5, width: '120px', height: '60px', typography: 'body1' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default RatingForm;
