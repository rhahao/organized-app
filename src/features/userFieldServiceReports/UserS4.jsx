import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { Markup } from 'interweave';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import UserS4Field from './UserS4Field';
import useUserRole from '../../hooks/useUserRole';
import { ServiceYear } from '../../classes/ServiceYear';
import { refreshScreenState } from '../../states/main';
import { UserS4MonthlyReport } from '../../classes/UserS4MonthlyReport';
import { getMonthName } from '../../utils/app';

const UserS4 = ({ month }) => {
  const { t } = useTranslation('ui');

  const { secretaryRole } = useUserRole();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const reportComment = useRef();

  const [screenRefresh, setScreenRefresh] = useRecoilState(refreshScreenState);

  const [isCurrent, setIsCurrent] = useState(false);
  const [hasReport, setHasReport] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [reportS4, setReportS4] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenSubmit = () => setSubmitOpen(true);
  const handleCloseSubmit = () => setSubmitOpen(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    const currentReport = UserS4MonthlyReport.get(month);
    await currentReport.saveComments(reportComment.current.value);
    await currentReport.submit();

    setScreenRefresh((prev) => !prev);
    setIsProcessing(false);
    setSubmitOpen(false);
  };

  const handleUndoSubmit = async () => {
    setIsProcessing(true);
    const currentReport = UserS4MonthlyReport.get(month);
    await currentReport.undoSubmit();

    setScreenRefresh((prev) => !prev);
    setIsProcessing(false);
  };

  useEffect(() => {
    setIsCurrent(false);
    setHasReport(false);

    const currentMonth = ServiceYear.currentReportMonth();
    if (currentMonth === month) {
      setIsCurrent(true);
    }

    const currentS4 = UserS4MonthlyReport.get(month);
    if (currentS4) {
      const hasReport = !currentS4.null();
      setHasReport(hasReport);
      setIsSubmitted(currentS4.isSubmitted);
      setIsPending(currentS4.isPending);
    }
  }, [month, screenRefresh]);

  useEffect(() => {
    setReportS4([]);
    setIsProcessing(false);

    if (submitOpen) {
      const result = [];

      const currentS4 = UserS4MonthlyReport.get(month);
      result.push({ key: crypto.randomUUID(), label: t('S4Placements'), value: currentS4.placements });
      result.push({ key: crypto.randomUUID(), label: t('S4Video'), value: currentS4.videos });
      result.push({ key: crypto.randomUUID(), label: t('S4Hours'), value: currentS4.hours.split(':')[0] });
      result.push({ key: crypto.randomUUID(), label: t('S4ReturnVisits'), value: currentS4.returnVisits });
      result.push({ key: crypto.randomUUID(), label: t('S4BibleStudies'), value: currentS4.bibleStudies });

      setReportS4(result);
    }
  }, [submitOpen, month, t]);

  return (
    <Box>
      <Dialog
        open={submitOpen}
        onClose={handleCloseSubmit}
        scroll="paper"
        fullScreen={fullScreen}
        aria-labelledby="submit-s4-dialog-close-title"
        aria-describedby="submit-s4-dialog-description"
      >
        <DialogTitle id="submit-s4-dialog-close-title" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {fullScreen && (
            <img
              src="./img/appLogo.png"
              alt="App Logo"
              style={{ width: 'auto', height: '30px', borderRadius: '4px' }}
            />
          )}

          <Typography sx={{ lineHeight: 1.2 }}>{t('S4Submit')}</Typography>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ minWidth: '250px' }}>
          <Typography>
            <Markup content={t('S4InfoHeader', { month: getMonthName(month) })} />
          </Typography>
          <Box sx={{ margin: '15px 0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {reportS4.map((field) => (
              <Box key={field.key}>
                <Typography sx={{ fontSize: '13px' }}>{field.label}</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{field.value}</Typography>
              </Box>
            ))}
          </Box>
          <Typography>
            <Markup content={t('S4CommentsInfo')} />
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            autoComplete="off"
            fullWidth={true}
            label={t('comments')}
            InputProps={{ readOnly: isProcessing }}
            inputRef={reportComment}
            sx={{ margin: '10px 0' }}
          />
        </DialogContent>
        <DialogActions sx={{ borderTop: '' }}>
          <Button disabled={isProcessing} onClick={handleCloseSubmit}>
            {t('cancel')}
          </Button>
          <Button
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={25} /> : null}
            onClick={handleSubmit}
          >
            {t('submit')}
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={1} sx={{ marginBottom: '20px', width: '305px', padding: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>Totals</Typography>
          {!secretaryRole && isCurrent && hasReport && !isSubmitted && (
            <Tooltip title={t('S4Submit')}>
              <IconButton color="success" onClick={handleOpenSubmit}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          )}

          {!secretaryRole && isSubmitted && isPending && !isProcessing && (
            <Tooltip title={t('undoSubmit')}>
              <IconButton color="error" onClick={handleUndoSubmit}>
                <CancelScheduleSendIcon />
              </IconButton>
            </Tooltip>
          )}

          {!submitOpen && isProcessing && <CircularProgress color="info" size={40} />}
        </Box>

        <Box sx={{ display: 'flex', gap: '5px' }}>
          <UserS4Field fldType="S4PlacementsAlt" fldName="placements" month={month} />
          <UserS4Field fldType="S4VideoAlt" fldName="videos" month={month} />
          <UserS4Field fldType="S4HoursAlt" fldName="hours" month={month} />
          <UserS4Field fldType="S4ReturnVisitsAlt" fldName="returnVisits" month={month} />
          <UserS4Field fldType="S4BibleStudiesAlt" fldName="bibleStudies" month={month} />
        </Box>

        {!secretaryRole && isSubmitted && isPending && !isProcessing && (
          <Box sx={{ borderTop: '1px outset', marginTop: '15px', paddingTop: '10px' }}>
            <Typography color="#D35400" sx={{ fontSize: '14px', lineHeight: 1.2 }}>
              <Markup content={t('S4UndoSubmitDisclaimer')} />
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UserS4;
