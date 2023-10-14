import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useCard from './useCard';
import { useAppTranslation } from '@hooks/index';

const sharedStyles = {
  root: { margin: '5px', height: '100%' },
  rootUnavailable: { margin: '5px', height: '100%' },
  chip: { margin: '2px', backgroundColor: 'black', color: 'white' },
};

const PersonCard = ({ person }) => {
  const { t } = useAppTranslation(0);

  const {
    isPersonEditor,
    handleOpenPerson,
    handleDelete,
    femaleIcon,
    maleIcon,
    isAuxiliaryPioneer,
    isBaptized,
    isElder,
    isMS,
    isRegularPioneer,
    isSpecialPioneer,
    isBR,
    isBS,
    isIC,
    isPublisherOnly,
    isRV,
    isT,
    isDisqualified,
  } = useCard(person);

  return (
    <Grid item sx={{ marginBottom: '5px' }} xs={12} sm={6} md={6} lg={4}>
      <Card sx={person.isDisqualified ? sharedStyles.rootUnavailable : sharedStyles.root}>
        <CardHeader
          sx={{
            padding: '5px',
            '& .MuiCardHeader-title': { fontSize: '16px', fontWeight: 'bold' },
            '& .MuiCardHeader-action': { alignSelf: 'center' },
          }}
          avatar={
            <Avatar
              sx={{ height: '50px', width: '50px' }}
              alt="Student icon"
              src={person.isMale ? maleIcon : femaleIcon}
            />
          }
          action={
            <>
              <Tooltip title={t('edit')}>
                <IconButton onClick={handleOpenPerson} color="primary">
                  {isPersonEditor && <EditIcon />}
                  {!isPersonEditor && <VisibilityIcon />}
                </IconButton>
              </Tooltip>
              {isPersonEditor && (
                <Tooltip title={t('delete')}>
                  <IconButton sx={{ marginRight: '5px' }} color="error" onClick={() => handleDelete(person)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
          title={person.person_name}
        />
        <CardContent
          sx={{
            padding: '2px',
            marginLeft: '60px',
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          {isDisqualified && (
            <Chip label={t('disqualifiedLabel')} size="small" color="error" sx={{ marginLeft: '10px' }} />
          )}

          {!isDisqualified && (
            <>
              {isBR && <Chip label={t('abbrBibleReading')} size="small" sx={sharedStyles.chip} />}
              {isIC && <Chip label={t('abbrInitialCall')} size="small" sx={sharedStyles.chip} />}
              {isRV && <Chip label={t('abbrReturnVisit')} size="small" sx={sharedStyles.chip} />}
              {isBS && <Chip label={t('abbrBibleStudy')} size="small" sx={sharedStyles.chip} />}
              {isT && <Chip label={t('abbrTalk')} size="small" sx={sharedStyles.chip} />}

              {isPublisherOnly && (
                <>
                  <Chip label={t('abbrPublisher')} size="small" sx={sharedStyles.chip} />
                  {isBaptized && <Chip label={t('abbrBaptized')} size="small" sx={sharedStyles.chip} />}
                </>
              )}
              {isMS && <Chip label={t('abbrMinisterialServant')} size="small" sx={sharedStyles.chip} />}
              {isElder && <Chip label={t('abbrElder')} size="small" sx={sharedStyles.chip} />}
              {isSpecialPioneer && <Chip label={t('abbrSpecialPioneer')} size="small" sx={sharedStyles.chip} />}
              {isRegularPioneer && <Chip label="FR" size="small" sx={sharedStyles.chip} />}
              {isAuxiliaryPioneer && <Chip label={t('abbrAuxiliaryPioneer')} size="small" sx={sharedStyles.chip} />}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

PersonCard.propTypes = {
  person: PropTypes.object,
};

export default PersonCard;
