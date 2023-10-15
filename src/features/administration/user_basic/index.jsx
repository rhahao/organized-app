import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Typography from '@mui/material/Typography';
import useUserBasic from './useUserBasic';
import { useAppTranslation } from '@hooks/index';

const CongregationUserBasic = ({ person }) => {
  const { t } = useAppTranslation();

  const { isElder, isMS, isPublisher } = useUserBasic({ person });

  return (
    <Box>
      <Typography variant="h5" sx={{ minWidth: '300px', fontWeight: 'bold' }}>
        {person.username}
      </Typography>
      <Typography>{person.user_uid}</Typography>

      {(isElder || isMS || isPublisher) && (
        <Box sx={{ marginLeft: '-50px', marginTop: person.user_uid ? '20px' : '40px', display: 'flex', gap: '8px' }}>
          <TipsAndUpdatesIcon sx={{ fontSize: '40px', color: '#F1C40F' }} />
          <Typography sx={{ fontSize: '14px' }}>
            <Markup
              content={t(
                isElder
                  ? 'cpeElderAutoAssignedRole'
                  : isMS
                  ? 'cpeMSAutoAssignedRole'
                  : isPublisher
                  ? 'cpePublisherAutoAssignedRole'
                  : ''
              )}
            />
          </Typography>
        </Box>
      )}
    </Box>
  );
};

CongregationUserBasic.propTypes = {
  person: PropTypes.object,
};

export default CongregationUserBasic;
