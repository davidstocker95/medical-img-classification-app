import { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Chip, 
  Stack
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';
import { AppContext } from '../context/AppContext';
import { incrementStoredTime, getStoredTime } from '../utils/timeTracker';


const Header = () => {
  const { user, images } = useContext(AppContext);
  const [minutesSpent, setMinutesSpent] = useState<number>(getStoredTime());

  useEffect(() => {
    const interval = setInterval(() => {
      incrementStoredTime();
      setMinutesSpent(prev => prev + 1);
    }, 60000); // increment every minute

    return () => clearInterval(interval); 
  }, []); 

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Medical Image Scorer
        </Typography>
        <Stack direction="row" spacing={3}>
          <Chip
            icon={<ImageIcon color='white' />}
            label={`Rated: ${user.ratings.length} / ${images.length}`}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white', padding: 2 }}
          />
          <Chip
            icon={<AccessTimeIcon color='white' />}
            label={`Time: ${minutesSpent} min`}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white', padding: 2 }}
          />
      </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
