import { Box, Stack } from '@mui/material';
import { IconDelete } from '@components/icons';
import { useAppTranslation, useBreakpoints } from '@hooks/index';
import { Field, FieldContainer } from './index.styles';
import { ServiceTimeProps } from './index.types';
import useServiceTime from './useServiceTime';
import BibleStudiesList from './bible_studies_list';
import BibleStudySelector from '../../bible_study_selector';
import Button from '@components/button';
import DatePicker from '@components/date_picker';
import HoursCreditPresets from '../../hours_credit_presets';
import HoursEditor from '@features/ministry/report/hours_editor';
import StandardEditor from '@features/ministry/report/standard_editor';
import Typography from '@components/typography';
import IconButton from '@components/icon_button';

const ServiceTime = (props: ServiceTimeProps) => {
  const { isEdit, onClose, date, maxDate, minDate, onDateChange } = props;

  const { t } = useAppTranslation();

  const { tabletUp } = useBreakpoints();

  const {
    bibleStudyRef,
    handleHoursChange,
    bibleStudies,
    handleBibleStudiesChange,
    bibleStudiesValidator,
    handleSaveReport,
    hours_credit_enabled,
    hoursEnabled,
    handleHoursCreditChange,
    hours_credit,
    hoursRef,
    handleSelectPreset,
    handleDeleteReport,
    handleCheckSelected,
    handleSelectStudy,
    hours_field,
  } = useServiceTime(props);

  return (
    <Box
      sx={{
        padding: '24px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      className="pop-up-shadow"
    >
      <Stack spacing="8px">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'space-between',
          }}
        >
          <Typography className="h2">
            {isEdit ? t('tr_editServiceTime') : t('tr_addServiceTime')}
          </Typography>

          {isEdit &&
            (tabletUp ? (
              <Button
                variant="small"
                color="red"
                onClick={handleDeleteReport}
                sx={{ minHeight: '32px', height: '32px' }}
                startIcon={<IconDelete />}
              >
                {t('tr_delete')}
              </Button>
            ) : (
              <IconButton onClick={handleDeleteReport} color="error">
                <IconDelete color="var(--red-main)" />
              </IconButton>
            ))}
        </Box>

        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          view="button"
          value={new Date(date)}
          onChange={onDateChange}
          hideNav={true}
        />
      </Stack>

      {hoursEnabled && (
        <FieldContainer ref={hoursRef}>
          <Field sx={{ flexDirection: tabletUp ? 'row' : 'column' }}>
            <Typography sx={{ flex: 1 }}>{t('tr_hours')}</Typography>
            <HoursEditor
              value={hours_field}
              onChange={handleHoursChange}
              hoursLength={2}
            />
          </Field>

          {hours_credit_enabled && (
            <Field sx={{ flexDirection: tabletUp ? 'row' : 'column' }}>
              <HoursCreditPresets
                anchorEl={hoursRef}
                onSelect={handleSelectPreset}
              />
              <HoursEditor
                value={hours_credit}
                onChange={handleHoursCreditChange}
                hoursLength={2}
              />
            </Field>
          )}
        </FieldContainer>
      )}

      <FieldContainer
        sx={{ gap: '8px', alignItems: tabletUp ? 'flex-start' : 'center' }}
        ref={bibleStudyRef}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: tabletUp ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <BibleStudySelector
            anchorEl={bibleStudyRef}
            editable={true}
            handleCheckSelected={handleCheckSelected}
            onChange={handleSelectStudy}
          />

          <StandardEditor
            value={bibleStudies.value}
            onChange={handleBibleStudiesChange}
            validator={bibleStudiesValidator}
          />
        </Box>
        <BibleStudiesList />
      </FieldContainer>

      <Box
        sx={{
          display: 'flex',
          flexDirection: tabletUp ? 'row' : 'column-reverse',
          gap: '8px',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="secondary" onClick={onClose}>
          {t('tr_cancel')}
        </Button>

        <Button variant="main" onClick={handleSaveReport}>
          {isEdit ? t('tr_save') : t('tr_add')}
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceTime;
