import { useState } from 'react';
import { Box, Button, IconButton, TextField, Modal } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

export const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 5,
  maxWidth: 400,     
  minWidth: 400,     
  height: 'auto',    
  maxHeight: '80vh',  
  overflowY: 'auto', 
  p: 4,
};


interface RatingCommentProps {
  comment: string;
  setComment: (comment: string) => void;
}
const RatingComment = ({ comment, setComment }: RatingCommentProps ) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localComment, setLocalComment] = useState('');

  const handleOpenModal = () => {
    setLocalComment(comment);
    setModalOpen(true);
  };

  const hanldeCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveComment = () => {
    setComment(comment);
    hanldeCloseModal();
  };

  return (
    <>
      <IconButton
        variant={(comment.length > 0) ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ borderRadius: 3, boxShadow: 5, width: '60px', height: '60px', typography: 'body1' }}
      >
        <ChatIcon />
      </IconButton>

      <Modal open={modalOpen} onClose={hanldeCloseModal}>
        <Box sx={modalBoxStyle}>
          <TextField
            label="Comment"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            value={localComment}
            onChange={(e) => setLocalComment(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button variant="outlined" color="error" startIcon={<DoDisturbAltIcon />} onClick={hanldeCloseModal}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleSaveComment}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RatingComment;
