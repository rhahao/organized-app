import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import useUserDetails from './useUserDetails';
import {
  CongregationUserBasic,
  CongregationUserDelegates,
  CongregationUserLocalRecord,
  CongregationUserPocketDevices,
  CongregationUserPocketSetup,
  CongregationUserRoles,
  CongregationUserVIPSessions,
} from '@features/index';
import { useAppTranslation } from '@hooks/index';

const CongregationUserDetails = () => {
  const { t } = useAppTranslation();

  const {
    person,
    user,
    handleBackAdmin,
    handleSaveCongPerson,
    handleRemoveCongPerson,
    member,
    handleCheckAdmin,
    handleCheckSecretary,
    handleCheckLMMO,
    handleCheckLMMOAssistant,
    handleCheckPublicTalkCoordinator,
    handleCheckCoordinator,
    handleCheckViewMeetingSchedule,
    handleUpdatePocketLocalId,
    handleUpdateUserDelegate,
    handleDeleteOCode,
    handleGenerateOCode,
    handleRevokeSession,
    handleDeleteDevice,
  } = useUserDetails();

  return (
    <Box>
      <Box sx={{ marginBottom: '100px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton onClick={handleBackAdmin}>
            <ArrowBackIcon sx={{ fontSize: '30px' }} />
          </IconButton>
          <Typography sx={{ fontWeight: 'bold' }}>{t('editCPEUser')}</Typography>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <AccountCircleIcon
              color={person.global_role === 'vip' ? 'primary' : 'secondary'}
              sx={{ fontSize: '50px' }}
            />

            <Box sx={{ flexGrow: 1 }}>
              {/* Name and Email */}
              <CongregationUserBasic person={person} />
            </Box>
          </Box>

          <Box sx={{ padding: '0 10px' }}>
            {/* Roles */}
            <CongregationUserRoles
              member={member}
              handleCheckAdmin={handleCheckAdmin}
              handleCheckLMMO={handleCheckLMMO}
              handleCheckLMMOAssistant={handleCheckLMMOAssistant}
              handleCheckSecretary={handleCheckSecretary}
              handleCheckViewMeetingSchedule={handleCheckViewMeetingSchedule}
              handleCheckPublicTalkCoordinator={handleCheckPublicTalkCoordinator}
              handleCheckCoordinator={handleCheckCoordinator}
            />

            {/* Local records */}
            <CongregationUserLocalRecord member={member} handleUpdatePocketLocalId={handleUpdatePocketLocalId} />

            {/* View Meeting Schedules for Others */}
            <CongregationUserDelegates
              member={member}
              person={person}
              handleUpdateUserDelegate={handleUpdateUserDelegate}
            />

            {/* Pocket Setup */}
            {member.global_role === 'pocket' && (
              <CongregationUserPocketSetup
                member={member}
                handleDeleteOCode={handleDeleteOCode}
                handleGenerateOCode={handleGenerateOCode}
              />
            )}

            {/* Sessions or Devices */}
            <Box sx={{ marginTop: '20px' }}>
              <Typography
                sx={{ fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px outset', paddingBottom: '5px' }}
              >
                {t('sessionsDevices')}
              </Typography>

              <Grid container spacing={2}>
                {person.global_role === 'vip' &&
                  person.sessions &&
                  person.sessions.map((session) => (
                    <CongregationUserVIPSessions
                      key={session.visitorid}
                      session={session}
                      handleRevokeSession={handleRevokeSession}
                    />
                  ))}

                {person.global_role === 'pocket' &&
                  person.pocket_devices.map((device) => (
                    <CongregationUserPocketDevices
                      key={device.visitorid}
                      device={device}
                      handleDeleteDevice={handleDeleteDevice}
                    />
                  ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 20, right: 20 }}>
        {user && person.global_role === 'vip' && user.email !== person.user_uid && (
          <Fab aria-label="save" color="error" onClick={handleRemoveCongPerson}>
            <PersonRemoveIcon />
          </Fab>
        )}
        <Fab aria-label="save" color="primary" onClick={handleSaveCongPerson}>
          <SaveIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default CongregationUserDetails;
