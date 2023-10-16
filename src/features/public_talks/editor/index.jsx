import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PublicTalkHistory from '../history';
import PublicTalkNumber from '../number';
import useEditor from './useEditor';

const PublicTalkEditor = ({ public_talk, readOnly, setPublicTalk }) => {
  const { handleCancel, handleEdit, handleSave, isEdit, setTitle, title } = useEditor({ public_talk, readOnly });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}>
        <PublicTalkNumber talk_number={public_talk.talk_number} />
        <Box sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{ readOnly: !isEdit }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <PublicTalkHistory talk_number={public_talk.talk_number} />

          {!readOnly && public_talk.talk_modified !== '' && (
            <Typography
              align="right"
              sx={{ fontSize: '14px', marginTop: '8px', fontStyle: 'italic', marginRight: '10px' }}
            >
              {new Date(public_talk.talk_modified).toLocaleString()}
            </Typography>
          )}
        </Box>

        {!isEdit && !readOnly && (
          <IconButton aria-label="edit" color="info" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
        {isEdit && (
          <IconButton aria-label="save" color="error" onClick={handleCancel}>
            <ClearIcon />
          </IconButton>
        )}
        {isEdit && (
          <IconButton aria-label="save" color="success" onClick={handleSave}>
            <CheckIcon />
          </IconButton>
        )}

        {readOnly && (
          <IconButton aria-label="save" color="success" onClick={() => setPublicTalk(public_talk.talk_number)}>
            <PlaylistAddCircleIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

PublicTalkEditor.propTypes = {
  public_talk: PropTypes.object,
  readOnly: PropTypes.bool,
  setPublicTalk: PropTypes.func,
};

export default PublicTalkEditor;
