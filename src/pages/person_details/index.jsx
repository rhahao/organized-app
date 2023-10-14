import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import HandshakeIcon from '@mui/icons-material/Handshake';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import Typography from '@mui/material/Typography';
import usePersonDetails from './usePersonDetails';
import femaleIcon from '@assets/img/person_female.svg';
import maleIcon from '@assets/img/person_male.svg';
import { useAppTranslation } from '@hooks/index';
import { Accordion, AccordionDetails, AccordionSummary } from '@components/index';
import {
  PersonAssignments,
  PersonAssignmentsHistory,
  PersonBasic,
  PersonSpiritualStatus,
  PersonTimeAway,
} from '@features/index';

const iconButtonStyles = {
  borderRadius: '8px',
  '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
    borderRadius: 0,
    backgroundColor: 'rgba(23, 32, 42, .3)',
  },
  border: '1px outset',
  marginLeft: '10px',
};

const txtButtonStyles = {
  textTransform: 'uppercase',
  fontSize: '14px',
  marginLeft: '8px',
  fontWeight: 'bold',
};

const PersonDetails = () => {
  const { t } = useAppTranslation();

  const {
    isProcessing,
    handleNavigatePersons,
    isEdit,
    isPersonEditor,
    person,
    lgUp,
    isMale,
    name,
    expanded,
    handleChange,
    birthDate,
    displayName,
    isFemale,
    personAddress,
    personEmail,
    personPhone,
    setBirthDate,
    setDisplayName,
    setIsFemale,
    setIsMale,
    setName,
    setPersonAddress,
    setPersonEmail,
    setPersonPhone,
    firstMonthReport,
    immersedDate,
    isAnointed,
    isBaptized,
    isOtherSheep,
    otherService,
    setFirstMonthReport,
    setImmersedDate,
    setIsAnointed,
    setIsBaptized,
    setIsOtherSheep,
    setOtherService,
    setSpiritualStatus,
    spiritualStatus,
    assignments,
    setAssignments,
    historyAssignments,
    timeAway,
    setTimeAway,
    handlePersonDisqualified,
    handlePersonEnabled,
    handlePersonMove,
    handleSavePerson,
  } = usePersonDetails();

  return (
    <Box sx={{ padding: '10px' }}>
      {isProcessing && (
        <CircularProgress
          color="secondary"
          size={80}
          disableShrink={true}
          sx={{
            display: 'flex',
            margin: '20vh auto',
          }}
        />
      )}
      {!isProcessing && (
        <>
          <Box id="person-details-header">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <IconButton onClick={handleNavigatePersons}>
                  <ArrowBackIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    flexGrow: 1,
                  }}
                >
                  {isEdit ? t(isPersonEditor ? 'edit' : 'details') : t('addNew')}
                </Typography>
              </Box>

              {isPersonEditor && (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {isEdit && person.isDisqualified === false && (
                    <Tooltip title={lgUp ? '' : t('markDisqualified')}>
                      <IconButton edge="start" color="inherit" sx={iconButtonStyles} onClick={handlePersonDisqualified}>
                        <RemoveCircleIcon color="error" />
                        {lgUp && <Typography sx={txtButtonStyles}>{t('markDisqualified')}</Typography>}
                      </IconButton>
                    </Tooltip>
                  )}

                  {isEdit && person.isDisqualified === true && (
                    <Tooltip title={lgUp ? '' : t('enablePerson')}>
                      <IconButton edge="start" color="inherit" sx={iconButtonStyles} onClick={handlePersonEnabled}>
                        <HandshakeIcon color="success" />
                        {lgUp && <Typography sx={txtButtonStyles}>{t('enablePerson')}</Typography>}
                      </IconButton>
                    </Tooltip>
                  )}

                  {isEdit && (
                    <Tooltip title={lgUp ? '' : t('markTransfer')}>
                      <IconButton edge="start" color="inherit" sx={iconButtonStyles} onClick={handlePersonMove}>
                        <TransferWithinAStationIcon sx={{ color: '#6C3483' }} />
                        {lgUp && <Typography sx={txtButtonStyles}>{t('markTransfer')}</Typography>}
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title={lgUp ? '' : t('save')}>
                    <IconButton edge="start" color="inherit" sx={iconButtonStyles} onClick={handleSavePerson}>
                      <SaveIcon color="primary" />
                      {lgUp && <Typography sx={txtButtonStyles}>{t('save')}</Typography>}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Box>

          <Box id="person-details-content" sx={{ marginTop: '20px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <Avatar
                sx={{
                  height: '50px',
                  width: '50px',
                  marginRight: '5px',
                }}
                alt="Student icon"
                src={isMale ? maleIcon : femaleIcon}
              />
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', lineHeight: 1.2 }}>{name}</Typography>
                {person.isDisqualified && (
                  <Chip label={t('disqualifiedLabel')} size="small" sx={{ backgroundColor: 'red', color: 'white' }} />
                )}
              </Box>
            </Box>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{t('basicInfo')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonBasic
                  isMale={isMale}
                  setIsMale={(value) => setIsMale(value)}
                  isFemale={isFemale}
                  setIsFemale={(value) => setIsFemale(value)}
                  name={name}
                  setName={(value) => setName(value)}
                  displayName={displayName}
                  setDisplayName={(value) => setDisplayName(value)}
                  birthDate={birthDate}
                  setBirthDate={(value) => setBirthDate(value)}
                  personEmail={personEmail}
                  setPersonEmail={(value) => setPersonEmail(value)}
                  personAddress={personAddress}
                  setPersonAddress={(value) => setPersonAddress(value)}
                  personPhone={personPhone}
                  setPersonPhone={(value) => setPersonPhone(value)}
                  isPersonEditor={isPersonEditor}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panelSpiritualStatus'} onChange={handleChange('panelSpiritualStatus')}>
              <AccordionSummary aria-controls="panelSpiritualStatus-content" id="panelSpiritualStatus-header">
                <Typography>{t('spiritualStatus')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonSpiritualStatus
                  isFemale={isFemale}
                  immersedDate={immersedDate}
                  setImmersedDate={(value) => setImmersedDate(value)}
                  isBaptized={isBaptized}
                  setIsBaptized={(value) => setIsBaptized(value)}
                  isOtherSheep={isOtherSheep}
                  setIsOtherSheep={(value) => setIsOtherSheep(value)}
                  isAnointed={isAnointed}
                  setIsAnointed={(value) => setIsAnointed(value)}
                  firstMonthReport={firstMonthReport}
                  setFirstMonthReport={(value) => setFirstMonthReport(value)}
                  birthDate={birthDate}
                  spiritualStatus={spiritualStatus}
                  setSpiritualStatus={(value) => setSpiritualStatus(value)}
                  otherService={otherService}
                  setOtherService={(value) => setOtherService(value)}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>{t('assignments')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonAssignments
                  person={person}
                  assignments={assignments}
                  setAssignments={(value) => setAssignments(value)}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>{t('assignmentsHistory')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonAssignmentsHistory history={historyAssignments} />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                <Typography>{t('timeAway')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonTimeAway timeAway={timeAway} setTimeAway={(value) => setTimeAway(value)} />
              </AccordionDetails>
            </Accordion>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PersonDetails;
