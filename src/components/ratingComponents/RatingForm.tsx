import { useState, useEffect, useContext } from "react";
import { Box, Button, Tooltip } from "@mui/material";

import { AppContext } from "../../context/AppContext";
import { getNextImage } from "../../utils/imageUtils";
import { saveUserRatingBrowser } from "../../utils/userUtils";
import { createDefaultRating } from "../../utils/ratingUtils";
import type { Rating } from "../../types";

import RatingComment from "./RatingComment";
import ScoreBar from "./ScoreBar";
import { ratingFormStyle } from "./RatingForm.styles";

/**
 * RatingForm
 *
 * Central UI for submitting a score and optional feedback for the current image.
 *
 * Features:
 * - Score selection (1–10)
 * - Comment and tag modal via `RatingComment`
 * - Tooltip-enabled Submit button with validation
 *
 * Context:
 * - Uses AppContext to access and update user, image, and image list
 *
 * Notes:
 * - Automatically generates a default rating on image load
 * - Submit is disabled until a score is selected
 */
const RatingForm = () => {
  const { user, setUser, image, setImage, images } = useContext(AppContext);
  const [rating, setRating] = useState<Rating | null>(null);

  const isSubmitDisabled = rating?.score == null;

  // Initialize the rating when the image changes
  useEffect(() => {
    if (image) {
      setRating(createDefaultRating(image.id));
    }
  }, [image]);

  // Handle submit action
  // If the user has already rated the image, update the existing rating
  // Set the next image to be rated
  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    const updatedUser = saveUserRatingBrowser({ ...user }, rating);
    setUser(updatedUser);
    setImage(getNextImage(images, updatedUser));
  };

  // Generic utility to update fields of the rating
  const setRatingField = <K extends keyof Rating>(key: K, value: Rating[K]) => {
    setRating((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  return (
    <>
      {image && rating && (
        <Box sx={ratingFormStyle}>
          <RatingComment
            comment={rating.comment}
            setComment={(c) => setRatingField("comment", c)}
            tags={rating.tags}
            setTags={(t) => setRatingField("tags", t)}
          />

          <ScoreBar
            currentScore={rating.score}
            setScore={(s) => setRatingField("score", s)}
          />

          <Tooltip
            title={isSubmitDisabled ? "Select a rating first" : "Submit your rating"}
            placement="right"
            enterDelay={500}
          >
            <span style={{ display: "inline-flex" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                sx={{ borderRadius: 3, boxShadow: 5, height: "60px", typography: "body1" }}
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
