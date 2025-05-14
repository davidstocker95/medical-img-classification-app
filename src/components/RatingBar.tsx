import { Box, IconButton } from '@mui/material';

type RatingBarProps = {
  currentRating: number | null;
  setRating: (rating: number) => void;
};

type RatingButtonProps = {
  rating: number;
  setRating: (rating: number) => void;
  selected?: boolean;
};

const getRatingButtonStyle = (selected: boolean) => ({
  mx: 1,
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  padding: 1,
  typography: 'body1',
  border: '1px solid',
  borderColor: 'primary.main',
  backgroundColor: selected ? 'primary.main' : 'transparent',
  color: selected ? 'white' : 'primary.main',
  '&:hover': {
    backgroundColor: selected ? 'primary.dark' : 'primary.light',
  }
})

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
  // bottom: 50,
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

const RatingBar = ({ currentRating, setRating }: RatingBarProps) => {
  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box sx={ratingBoxStyle}>
      {ratings.map((rating) => (
        <RatingButton key={rating} rating={rating} setRating={setRating} selected={currentRating === rating} />
      ))}
    </Box>
  );
};

export default RatingBar;
