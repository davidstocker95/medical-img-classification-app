/**
 * Layout style for the main RatingForm.
 * Responsive to wrap elements on narrow screens.
 */
export const ratingFormStyle = {
  position: "fixed",
  bottom: "5vh",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 2,
  columnGap: 7,
  width: "100%",
  maxWidth: "1000px",
  padding: "16px 32px",
  zIndex: 10,
  borderRadius: 5,
  bgcolor: "background.paper",

  // Ensures good structure on narrow screens
  "@media (max-width: 600px)": {
    columnGap: 3,
    rowGap: 2,
    padding: "12px 16px",
  },
};
