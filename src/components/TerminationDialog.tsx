import { useContext, useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { AppContext } from '../context/AppContext';
import { hasUserRatedAllImages } from '../utils/ratingUtils';
import { resetUserRatingsBrowser } from '../utils/userUtils';

const TerminationDialog = () => {
  const { user, setUser, images } = useContext(AppContext);
  const [isRatingComplete, setIsRatingComplete] = useState(false);

  useEffect(() => {
    setIsRatingComplete(hasUserRatedAllImages(images, user));
  }, [images, user]);

  const restartRating = () => {
    setUser((prevUser) => ({ ...prevUser, ratings: [] }));
    resetUserRatingsBrowser(user);
    setIsRatingComplete(false);
  };

  const numberOfRatedImages = user.ratings.length;
  return (
    <Dialog
      open={isRatingComplete}
      onClose={() => {}}
      aria-labelledby="termination-dialog-title"
      slotProps={{
        paper: {
          sx: {
          borderRadius: 5,
          px: 4,
          py: 3,
          textAlign: 'center',
        },
      }
      }}
    >
      <DialogTitle id="termination-dialog-title">Rating Complete!</DialogTitle>

      <DialogContent>
        <DialogContentText>
          You have rated {numberOfRatedImages} {(numberOfRatedImages === 1) ? "image": "images"}.
        </DialogContentText>
        <DialogContentText>Thank you for your work!</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={restartRating}>
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TerminationDialog;
