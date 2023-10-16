import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import PublicTalkEditor from '../editor';
import useContainer from './useContainer';

const PublicTalkContainer = ({ currentPage, readOnly, setPublicTalk }) => {
  const { publicTalks } = useContainer();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {publicTalks.slice(currentPage * 10, currentPage * 10 + 10).map((talk) => (
        <PublicTalkEditor key={talk.talk_number} public_talk={talk} readOnly={readOnly} setPublicTalk={setPublicTalk} />
      ))}
    </Box>
  );
};

PublicTalkContainer.propTypes = {
  currentPage: PropTypes.number,
  readOnly: PropTypes.bool,
  setPublicTalk: PropTypes.func,
};

export default PublicTalkContainer;
