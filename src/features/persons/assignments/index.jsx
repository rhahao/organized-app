import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import useAssignments from './useAssignments';
import { useAppTranslation } from '@hooks/index';

const PersonAssignments = ({ person, assignments, setAssignments }) => {
  const { t } = useAppTranslation();

  const {
    handleAssignmentsChange,
    isAYFBibleStudy,
    isAYFInitialCall,
    isAYFReturnVisit,
    isAYFTalk,
    isEditAllowed,
    isLCCBSConductor,
    isLCCBSReader,
    isLCPart,
    isMidweekChairman,
    isMidweekPrayer,
    isSpeaker,
    isSpeakerSymposium,
    isTGWBibleReading,
    isTGWGems,
    isTGWTalk,
    isWTStudyReader,
    isWeekendChairman,
    isWeekendPrayer,
    lmmoRole,
    coordinatorRole,
    publicTalkCoordinatorRole,
  } = useAssignments({ assignments, setAssignments });

  return (
    <Box id="assignments-container">
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography variant="h6" className="midweekMeeting meetingPart-override">
            {t('midweekMeeting')}
          </Typography>
          <FormGroup sx={{ width: 'fit-content' }}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={person.isFemale}
                  checked={person.isFemale ? false : isMidweekChairman}
                  onChange={lmmoRole ? (e) => handleAssignmentsChange(110, e.target.checked) : null}
                />
              }
              label={t('chairmanMidweekMeeting', { ns: 'source' })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={person.isFemale}
                  checked={person.isFemale ? false : isMidweekPrayer}
                  onChange={lmmoRole ? (e) => handleAssignmentsChange(111, e.target.checked) : null}
                />
              }
              label={t('prayerMidweekMeeting', { ns: 'source' })}
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '15px',
            flexWrap: 'wrap',
            marginLeft: '10px',
          }}
        >
          <Box>
            <Typography variant="h6" className="tgwPart meetingPart-override">
              {t('treasuresPart')}
            </Typography>
            <FormGroup sx={{ width: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isTGWTalk}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(112, e.target.checked) : null}
                  />
                }
                label={t('tgwTalk', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isTGWGems}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(113, e.target.checked) : null}
                  />
                }
                label={t('tgwGems', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isTGWBibleReading}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(100, e.target.checked) : null}
                  />
                }
                label={t('bibleReading', { ns: 'source' })}
              />
            </FormGroup>
          </Box>

          <Box>
            <Typography variant="h6" className="ayfPart meetingPart-override">
              {t('applyFieldMinistryPart')}
            </Typography>
            <FormGroup sx={{ width: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAYFInitialCall}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(101, e.target.checked) : null}
                  />
                }
                label={t('initialCall', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAYFReturnVisit}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(102, e.target.checked) : null}
                  />
                }
                label={t('returnVisit', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAYFBibleStudy}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(103, e.target.checked) : null}
                  />
                }
                label={t('bibleStudy', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isAYFTalk}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(104, e.target.checked) : null}
                  />
                }
                label={t('talk', { ns: 'source' })}
              />
            </FormGroup>
          </Box>

          <Box>
            <Typography variant="h6" className="lcPart meetingPart-override">
              {t('livingPart')}
            </Typography>
            <FormGroup sx={{ width: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isLCPart}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(114, e.target.checked) : null}
                  />
                }
                label={t('lcPart', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isLCCBSConductor}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(115, e.target.checked) : null}
                  />
                }
                label={`${t('cbs', { ns: 'source' })} - ${t('cbsConductor', { ns: 'source' })}`}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isLCCBSReader}
                    onChange={lmmoRole ? (e) => handleAssignmentsChange(116, e.target.checked) : null}
                  />
                }
                label={`${t('cbs', { ns: 'source' })} - ${t('cbsReader', { ns: 'source' })}`}
              />
            </FormGroup>
          </Box>
        </Box>
      </Box>
      {isEditAllowed && !lmmoRole && (
        <Typography sx={{ fontStyle: 'italic', marginTop: '20px' }} color="#FE4119">
          {t('midweekMeetingAssignmentsNotice')}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
        }}
      >
        <Box>
          <Typography variant="h6" className="weekendMeeting meetingPart-override">
            {t('weekendMeeting')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ minWidth: '180px' }}>
            <FormGroup sx={{ width: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isWeekendChairman}
                    onChange={coordinatorRole ? (e) => handleAssignmentsChange(118, e.target.checked) : null}
                  />
                }
                label={t('chairmanWeekendMeeting', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isWeekendPrayer}
                    onChange={coordinatorRole ? (e) => handleAssignmentsChange(119, e.target.checked) : null}
                  />
                }
                label={t('prayerWeekendMeeting', { ns: 'source' })}
              />
            </FormGroup>
          </Box>

          <Box>
            <FormGroup sx={{ width: 'fit-content' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isSpeaker}
                    onChange={
                      coordinatorRole || publicTalkCoordinatorRole
                        ? (e) => handleAssignmentsChange(120, e.target.checked)
                        : null
                    }
                  />
                }
                label={t('speaker', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isSpeakerSymposium}
                    onChange={
                      coordinatorRole || publicTalkCoordinatorRole
                        ? (e) => handleAssignmentsChange(121, e.target.checked)
                        : null
                    }
                  />
                }
                label={t('speakerSymposium', { ns: 'source' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={person.isFemale}
                    checked={person.isFemale ? false : isWTStudyReader}
                    onChange={coordinatorRole ? (e) => handleAssignmentsChange(122, e.target.checked) : null}
                  />
                }
                label={t('wtStudyReader', { ns: 'source' })}
              />
            </FormGroup>
          </Box>
        </Box>
      </Box>
      {isEditAllowed && (
        <Typography sx={{ fontStyle: 'italic', marginTop: '20px' }} color="#FE4119">
          {!coordinatorRole && !publicTalkCoordinatorRole && t('weekendMeetingAssignmentsNotice')}
          {!coordinatorRole && publicTalkCoordinatorRole && t('weekendMeetingAssignmentsPublicTalkCoordinatorNotice')}
        </Typography>
      )}
    </Box>
  );
};

PersonAssignments.propTypes = {
  person: PropTypes.object,
  assignments: PropTypes.array,
  setAssignments: PropTypes.func,
};

export default PersonAssignments;
