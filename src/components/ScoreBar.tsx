import { Box, IconButton } from '@mui/material';
import { getScoreButtonStyle, scoreBoxStyle } from './ScoreBar.styles';

type ScoreButtonProps = {
  score: number;
  setScore: (score: number) => void;
  selected?: boolean;
};

const ScoreButton = ({ score, setScore, selected = false }: ScoreButtonProps) => {
  return (
    <IconButton
      color="primary"
      onClick={() => setScore(score)}
      sx={getScoreButtonStyle(selected)}
    >
      {score}
    </IconButton>
  );
};

type ScoreBarProps = {
  currentScore: number | null;
  setScore: (score: number) => void;
};

const SCORES = Array.from({ length: 10 }, (_, i) => i + 1);

const ScoreBar = ({ currentScore, setScore }: ScoreBarProps) => {

  return (
    <Box sx={scoreBoxStyle}>
      {SCORES.map((score) => (
        <ScoreButton key={score} score={score} setScore={setScore} selected={currentScore === score} />
      ))}
    </Box>
  );
};

export default ScoreBar;
