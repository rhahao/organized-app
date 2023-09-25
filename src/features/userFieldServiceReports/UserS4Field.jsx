import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserS4MonthlyReport } from '../../classes/UserS4MonthlyReport';
import { refreshScreenState } from '../../states/main';

const UserS4Field = ({ fldType, fldName, month }) => {
  const { t } = useTranslation('ui');

  const screenRefresh = useRecoilValue(refreshScreenState);

  const [value, setValue] = useState('');

  const fldLocal = useMemo(() => t(fldType), [fldType, t]);

  useEffect(() => {
    const loadS4 = async () => {
      let currentS4 = UserS4MonthlyReport.get(month);
      if (currentS4) {
        if (fldName === 'placements') {
          currentS4 = await currentS4.calculatePlacements();
          setValue(currentS4.placements);
        }

        if (fldName === 'videos') {
          currentS4 = await currentS4.calculateVideos();
          setValue(currentS4.videos);
        }

        if (fldName === 'hours') {
          currentS4 = await currentS4.calculateHours();
          let value = currentS4.hours.split(':')[0];
          if (value === '0') value = '';
          setValue(value);
        }

        if (fldName === 'returnVisits') {
          currentS4 = await currentS4.calculateReturnVisits();
          setValue(currentS4.returnVisits);
        }

        if (fldName === 'bibleStudies') {
          currentS4 = await currentS4.calculateBiblesStudies();
          setValue(currentS4.bibleStudies);
        }
      }
    };

    if (month) {
      loadS4();
    }
  }, [month, fldName, screenRefresh]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '53px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: '12px' }}>{fldLocal}</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{value}</Typography>
    </Box>
  );
};

export default UserS4Field;
