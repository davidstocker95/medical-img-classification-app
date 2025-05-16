/**
 * Styles for the comment toggle button.
 */
export const getButtonStyles = (commentAvailable: boolean) => ({
  borderRadius: 3,
  boxShadow: 5,
  width: "60px",
  height: "60px",
  typography: "body1",
  color: commentAvailable ? "background.paper" : "primary.main",
  backgroundColor: commentAvailable ? "primary.main" : "background.paper",
  "&:hover": {
    backgroundColor: commentAvailable ? "primary.dark" : "primary.light",
    color: commentAvailable ? "background.paper" : "primary.main",
  },
});

/**
 * Modal layout styling.
 */
export const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 5,
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  p: 4,
};
