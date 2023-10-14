import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IncomingSpeaker from '../incoming';
import useIncomingSpeakers from './useIncomingSpeakers';
import { useAppTranslation } from '@hooks/index';

const IncomingSpeakers = ({ cong }) => {
  const { t } = useAppTranslation();

  const { isEditor, speakers } = useIncomingSpeakers({ cong });

  return (
    <Box>
      {cong.request_status === 'pending' && <Typography>{t('visitingSpeakersRequestPending')}</Typography>}

      {cong.request_status === 'disapproved' && <Typography>{t('visitingSpeakersRequestDisapproved')}</Typography>}

      {/* Speakers List */}
      {speakers.map((speaker) => (
        <IncomingSpeaker key={speaker.person_uid} speaker={speaker} cong_number={cong.cong_number} />
      ))}

      {/* Speaker Add  */}
      {isEditor && cong.is_local && <IncomingSpeaker isNew={true} cong_number={cong.cong_number} />}
    </Box>
  );
};

IncomingSpeakers.propTypes = {
  cong: PropTypes.object,
};

export default IncomingSpeakers;
