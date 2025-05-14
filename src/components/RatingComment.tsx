import { useState } from 'react';

import { Box, Button, IconButton, TextField, Modal } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from "@mui/material/Tooltip";

import { getButtonStyles, modalBoxStyle } from './RatingComment.styles';

interface RatingCommentProps {
  comment: string;
  setComment: (comment: string) => void;
}

const RatingComment = ({ comment, setComment }: RatingCommentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localComment, setLocalComment] = useState(comment);

  const handleOpenModal = () => {
    setLocalComment(comment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClearComment = () => {
    setLocalComment('');
  };

  const handleSaveComment = () => {
    setComment(localComment);
    setModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveComment();
    }
  };

  return (
    <>
      <Tooltip title="Leave a Comment" placement="left" enterDelay={500}>
        <IconButton onClick={handleOpenModal} sx={getButtonStyles(comment.length > 0)}>
          <ChatIcon />
        </IconButton>
      </Tooltip>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalBoxStyle}>
          <TextField
            label="Comment"
            multiline
            minRows={4}
            variant="outlined"
            fullWidth
            value={localComment}
            onChange={(e) => setLocalComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button
              variant="outlined"
              startIcon={<DoDisturbAltIcon />}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleClearComment}
            >
              Clear
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
