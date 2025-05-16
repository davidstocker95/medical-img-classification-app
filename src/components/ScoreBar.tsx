import { Box, IconButton } from "@mui/material";
import { getScoreButtonStyle, scoreBoxStyle } from "./ScoreBar.styles";

type ScoreButtonProps = {
  score: number;
  setScore: (score: number) => void;
  selected?: boolean;
};

const ScoreButton = ({ score, setScore, selected = false }: ScoreButtonProps) => (
  <IconButton
    color="primary"
    onClick={() => setScore(score)}
    sx={getScoreButtonStyle(selected)}
  >
    {score}
  </IconButton>
);

type ScoreBarProps = {
  currentScore: number | null;
  setScore: (score: number) => void;
};

const SCORES = Array.from({ length: 10 }, (_, i) => i + 1);

/**
 * ScoreBar
 *
 * Renders a horizontal row of numeric score buttons (1–10).
 * Highlights the selected score and handles updates.
 *
 * Props:
 * @param {number | null} currentScore - The score currently selected
 * @param {(score: number) => void} setScore - Updates the selected score
 */
const ScoreBar = ({ currentScore, setScore }: ScoreBarProps) => (
  <Box sx={scoreBoxStyle}>
    {SCORES.map((score) => (
      <ScoreButton
        key={score}
        score={score}
        setScore={setScore}
        selected={currentScore === score}
      />
    ))}
  </Box>
);

export default ScoreBar;
