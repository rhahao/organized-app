import { Box, Stack } from '@mui/material';
import {
  IconArrowBack,
  IconAuxiliaryPioneer,
  IconCheck,
  IconDelete,
  IconInfo,
} from '@components/icons';
import {
  useAppTranslation,
  useBreakpoints,
  useCurrentUser,
} from '@hooks/index';
import useReportDetails from './useReportDetails';
import Button from '@components/button';
import Card from '@components/card';
import FormS4 from '@features/ministry/report/form_S4';
import LateReport from './late_report';
import PersonDetails from '@features/persons/person_details';
import Typography from '@components/typography';

const ReportDetails = () => {
  const { t } = useAppTranslation();

  const { desktopUp } = useBreakpoints();

  const { isSecretary, isGroup } = useCurrentUser();

  const {
    person,
    handleBack,
    enable_quick_AP,
    unverified,
    handleAssignAP,
    handleVerifyReport,
    isInactive,
    handleMarkAsActive,
    currentMonth,
    deletable,
    handleDeleteReport,
  } = useReportDetails();

  return (
    <Card sx={{ position: 'sticky', top: '72px' }}>
      {!person && (
        <Typography color="var(--grey-350)">
          <Box
            component="span"
            sx={{
              verticalAlign: '-6px',
              display: 'inline-flex',
              marginRight: '4px',
            }}
          >
            <IconInfo color="var(--grey-350)" />
          </Box>
          {t('tr_reportPageInfo')}
        </Typography>
      )}

      {person && (
        <Stack spacing="24px">
          <Stack spacing="8px">
            {!desktopUp && (
              <Button
                variant="small"
                onClick={handleBack}
                startIcon={<IconArrowBack width={18} height={18} />}
                disableAutoStretch
                sx={{
                  height: '32px',
                  minHeight: '32px',
                  alignSelf: 'flex-start',
                  padding: '0 8px',
                }}
              >
                {t('tr_back')}
              </Button>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <PersonDetails person={person} month={currentMonth} />
              <LateReport person={person} />
            </Box>
          </Stack>

          <FormS4 month={currentMonth} person_uid={person.person_uid} />

          {!isGroup && isSecretary && (
            <Stack spacing="8px">
              {enable_quick_AP && (
                <Button
                  variant="tertiary"
                  startIcon={<IconAuxiliaryPioneer />}
                  onClick={handleAssignAP}
                >
                  {t('tr_assignAuxPioBtn')}
                </Button>
              )}

              {unverified && (
                <Button
                  variant="main"
                  startIcon={<IconCheck />}
                  onClick={handleVerifyReport}
                >
                  {t('tr_markAsVerified')}
                </Button>
              )}

              {deletable && (
                <Button
                  variant="main"
                  color="red"
                  startIcon={<IconDelete />}
                  onClick={handleDeleteReport}
                >
                  {t('tr_delete')}
                </Button>
              )}

              {isInactive && (
                <Button
                  variant="main"
                  onClick={handleMarkAsActive}
                  startIcon={<IconCheck />}
                >
                  {t('tr_reactivatePublisher')}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default ReportDetails;
