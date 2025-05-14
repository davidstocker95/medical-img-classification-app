
export const getRatingButtonStyle = (selected: boolean) => ({
  mx: 1,
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  padding: 1,
  typography: 'body1',
  border: '1px solid',
  borderColor: 'primary.main',
  backgroundColor: selected ? 'primary.main' : 'transparent',
  color: selected ? 'white' : 'primary.main',
  '&:hover': {
    backgroundColor: selected ? 'primary.dark' : 'primary.light',
  }
})

export const ratingBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  left: '50%',
  bgcolor: 'background.paper',
  boxShadow: 5,
  borderRadius: 3,
  p: 1.5,
};
