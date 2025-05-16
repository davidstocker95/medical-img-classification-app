import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Modal,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getButtonStyles, modalBoxStyle } from './RatingComment.styles';
import type { RatingTag } from '../types';

const RATING_TAGS: RatingTag[] = [
  'ambiguous',
  'artifact',
  'non-pathalogical',
];

interface RatingCommentProps {
  comment: string;
  setComment: (comment: string) => void;
  tags: RatingTag[];
  setTags: (tags: RatingTag[]) => void;
}

const RatingComment = ({ comment, setComment, tags, setTags }: RatingCommentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localComment, setLocalComment] = useState(comment);
  const [localTags, setLocalTags] = useState<RatingTag[]>(tags);

  const openModal = () => {
    setLocalComment(comment);
    setLocalTags(tags);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const clearAll = () => {
    setLocalComment('');
    setLocalTags([]);
  };

  const saveChanges = () => {
    setComment(localComment);
    setTags(localTags);
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveChanges();
    }
  };

  const toggleTag = (tag: RatingTag) => {
    setLocalTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <Tooltip title="Leave a Comment" placement="left" enterDelay={500}>
        <IconButton onClick={openModal} sx={getButtonStyles(comment.length > 0 || tags.length > 0)}>
          <ChatIcon />
        </IconButton>
      </Tooltip>

      <Modal open={modalOpen} onClose={closeModal}>
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

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ mt: 2, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {RATING_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                variant={localTags.includes(tag) ? 'filled' : 'outlined'}
                onClick={() => toggleTag(tag)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" startIcon={<DoDisturbAltIcon />} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={clearAll}>
              Clear
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={saveChanges}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RatingComment;
