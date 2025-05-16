import { useContext, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { AppContext } from "../context/AppContext";
import { hasUserRatedAllImages } from "../utils/ratingUtils";
import { resetUserRatingsBrowser } from "../utils/userUtils";
import { getNextImage } from "../utils/imageUtils";

const terminationDialogStyle = {
  borderRadius: 5,
  px: 4,
  py: 3,
  textAlign: "center",
};

/**
 * TerminationDialog
 *
 * Displays a modal dialog when the user has rated all images.
 * Offers an option to restart the process and clears saved ratings.
 *
 * Features:
 * - Auto-appears when all images are rated
 * - Shows count of rated images
 * - Allows restarting with reset state
 *
 * Context:
 * - Uses AppContext to read and update user, images, and image state
 *
 * Notes:
 * - Session is cleared in localStorage as well as in-memory
 */
const TerminationDialog = () => {
  const { user, setUser, images, setImage } = useContext(AppContext);
  const [isRatingComplete, setIsRatingComplete] = useState(false);

  // Check if the user has rated all images 
  useEffect(() => {
    setIsRatingComplete(hasUserRatedAllImages(images, user));
  }, [images, user]);

  // Restart the rating process
  const restartRating = () => {
    const updatedUser = { ...user, ratings: [] };
    setUser(updatedUser);
    resetUserRatingsBrowser(user);

    const nextImage = getNextImage(images, updatedUser);
    setImage(nextImage);
    setIsRatingComplete(false);
  };

  const numberOfRatedImages = user.ratings.length;

  return (
    <Dialog
      open={isRatingComplete}
      onClose={() => {}}
      slotProps={{ paper: { sx: terminationDialogStyle } }}
    >
      <DialogTitle>Rating Complete!</DialogTitle>

      <DialogContent>
        <DialogContentText>
          You have rated {numberOfRatedImages}{" "}
          {numberOfRatedImages === 1 ? "image" : "images"}.
        </DialogContentText>
        <DialogContentText>Thank you for your work!</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={restartRating}>
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TerminationDialog;
