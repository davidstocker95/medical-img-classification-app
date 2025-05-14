import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AppContext } from '../context/AppContext';
import { hasUserRatedAllImages } from '../utils/ratingUtils';
import { resetUserRatingsBrowser } from '../utils/userUtils';

const TerminationDialog = () => {
  const { user, setUser, images } = useContext(AppContext);
  const [isRatingComplete, setIsRatingComplete] = useState(
    hasUserRatedAllImages(images, user)
  );

  useEffect(() => {
    const complete = hasUserRatedAllImages(images, user);
    setIsRatingComplete(complete);
  }, [images, user]);

  const restartRating = () => {
    setIsRatingComplete(false);
    setUser((prevUser) => ({
      ...prevUser,
      ratings: [],
    }));
    resetUserRatingsBrowser(user);
  };

  return (
    <Dialog
        open={isRatingComplete}
        onClose={() => {}}
        aria-labelledby="termination-dialog"
        aria-describedby="termination-dialog"
      >
        <DialogTitle id="termination-dialog-title">
          {"Rating Complete!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="number-of-images">
            You have rated {user.ratings.length} images.
          </DialogContentText>
          <DialogContentText id="number-of-images">
            Thank you for your feedback!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
              color="primary"
            onClick={restartRating}
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default TerminationDialog;
