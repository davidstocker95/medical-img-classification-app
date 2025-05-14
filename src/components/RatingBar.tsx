import { Box, IconButton } from '@mui/material';

type RatingBarProps = {
  setRatingProp: (rating: number) => void;
  maxRating?: number; // Optional: default to 5
};

type RatingButtonProps = {
  rating: number;
  setRatingProp: (rating: number) => void;
};

const ratingBoxStyle = {
  // position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  left: '50%',
  // transform: 'translateX(-50%)',
  bgcolor: 'background.paper',
  boxShadow: 5,
  borderRadius: 3,
  p: 1.5,
  zIndex: 1,
  // bottom: 50,
};

const RatingButton = ({ rating, setRatingProp }: RatingButtonProps) => {
  return (
    <IconButton
      variant="contained"
      color="primary"
      onClick={() => setRatingProp(rating)}
      sx={{ mx: 1, width: '50px', height: '50px', border: '1px solid', borderRadius: 3, padding: 1 }}
    >
      {rating}
    </IconButton>
  );
};

const RatingBar = ({ setRatingProp, maxRating = 10 }: RatingBarProps) => {
  const ratings = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <Box sx={ratingBoxStyle}>
      {ratings.map((rating) => (
        <RatingButton key={rating} rating={rating} setRatingProp={setRatingProp} />
      ))}
    </Box>
  );
};

export default RatingBar;
