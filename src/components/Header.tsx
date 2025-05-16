import { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ImageIcon from "@mui/icons-material/Image";

import { AppContext } from "../context/AppContext";
import { incrementStoredTime, getStoredTime } from "../utils/timeTracker";

const headerChipStyle = {
  color: "background.paper",
  borderColor: "background.paper",
  padding: 2,
  "& .MuiChip-icon": {
    color: "background.paper",
  },
};

/**
 * Header
 *
 * Displays the app title and user progress information in the top AppBar.
 *
 * Features:
 * - Title: "Medical Image Scorer"
 * - Chip showing number of rated images vs. total
 * - Chip showing total time spent (in minutes)
 *
 * State:
 * - minutesSpent: Tracks the total time user has spent in the app
 * 
 * Context:
 * - Reads `user.ratings` and `images` from AppContext
 * 
 * Side Effects:
 * - Sets up a timer that increments stored time every minute
 * - Persists time data in localStorage
 * 
 * Notes:
 * - Time tracking persists across sessions via localStorage
 */
const Header = () => {
  const { user, images } = useContext(AppContext);
  const [minutesSpent, setMinutesSpent] = useState<number>(getStoredTime());

  // Increment the stored time in localStorage every minute
  useEffect(() => {
    const interval = setInterval(() => {
      incrementStoredTime();
      setMinutesSpent((prev) => prev + 1);
    }, 60000); // increment every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, color: "background.paper" }}>
          Medical Image Scorer
        </Typography>

        <Stack direction="row" spacing={3}>
          <Chip
            icon={<ImageIcon />}
            label={`Rated: ${user.ratings.length} / ${images.length}`}
            variant="outlined"
            sx={headerChipStyle}
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`Time: ${minutesSpent} min`}
            variant="outlined"
            sx={headerChipStyle}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
