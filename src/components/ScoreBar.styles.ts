/**
 * Styles for individual score buttons.
 */
export const getScoreButtonStyle = (selected: boolean) => ({
  mx: 1,
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  padding: 1,
  typography: "body1",
  border: "1px solid",
  borderColor: "primary.main",
  backgroundColor: selected ? "primary.main" : "transparent",
  color: selected ? "white" : "primary.main",
  "&:hover": {
    backgroundColor: selected ? "primary.dark" : "primary.light",
  },
});

/**
 * Layout style for the score bar container.
 */
export const scoreBoxStyle = {
  display: "flex",
  flexDirection: "row",
  left: "50%",
  bgcolor: "background.paper",
  boxShadow: 5,
  borderRadius: 3,
  p: 1.5,
};
