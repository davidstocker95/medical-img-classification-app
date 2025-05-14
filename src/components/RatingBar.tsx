import { Box, IconButton } from '@mui/material';
import { getRatingButtonStyle, ratingBoxStyle } from './RatingBar.styles';

type RatingButtonProps = {
  rating: number;
  setRating: (rating: number) => void;
  selected?: boolean;
};

const RatingButton = ({ rating, setRating, selected = false }: RatingButtonProps) => {
  return (
    <IconButton
      variant={ selected ? "contained": "outlined"}
      color="primary"
      onClick={() => setRating(rating)}
      sx={getRatingButtonStyle(selected)}
    >
      {rating}
    </IconButton>
  );
};

type RatingBarProps = {
  currentRating: number | null;
  setRating: (rating: number) => void;
};

const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

const RatingBar = ({ currentRating, setRating }: RatingBarProps) => {

  return (
    <Box sx={ratingBoxStyle}>
      {ratings.map((rating) => (
        <RatingButton key={rating} rating={rating} setRating={setRating} selected={currentRating === rating} />
      ))}
    </Box>
  );
};

export default RatingBar;
