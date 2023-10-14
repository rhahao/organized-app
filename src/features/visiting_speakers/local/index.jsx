import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LocalSpeakersAccess from '../local_access';
import LocalSpeakerAdd from '../add_local';
import OutgoingSpeaker from '../outgoing';
import useLocal from './useLocal';

const LocalSpeakers = ({ speakersAccessOpen }) => {
  const { isEditor, speakers } = useLocal();

  return (
    <Box>
      {/* Access List */}
      <LocalSpeakersAccess speakersAccessOpen={speakersAccessOpen} />

      {/* Local Speakers List */}
      {speakers.map((speaker) => (
        <OutgoingSpeaker key={speaker.person_uid} speaker={speaker} />
      ))}

      {/* Add speaker  */}
      {isEditor && <LocalSpeakerAdd />}
    </Box>
  );
};

LocalSpeakers.propTypes = {
  speakersAccessOpen: PropTypes.bool,
};

export default LocalSpeakers;
