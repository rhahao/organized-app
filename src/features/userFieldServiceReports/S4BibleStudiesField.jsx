import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BibleStudies } from '../../classes/BibleStudies';
import { UserS4Records } from '../../classes/UserS4Records';
import { refreshScreenState } from '../../states/main';
import { isBibleStudyEditorOpenState } from '../../states/report';
import { UserS4MonthlyReport } from '../../classes/UserS4MonthlyReport';

const filter = createFilterOptions();

const S4BibleStudiesField = ({ currentDate, month }) => {
  const { t } = useTranslation('ui');

  const [openEditor, setOpenEditor] = useRecoilState(isBibleStudyEditorOpenState);

  const [screenRefresh, setScreenRefresh] = useRecoilState(refreshScreenState);

  const [bsCount, setBsCount] = useState('');
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdateBibleStudies = async (newValue, details, reason) => {
    // add new bible study
    if ((details?.option.create && reason !== 'removeOption') || reason === 'createOption') {
      const newRecord = details.option.person_name || details.option;

      const data = await BibleStudies.create(newRecord);

      const tmpOptions = data.map((record) => {
        return { uid: record.uid, person_name: record.person_name };
      });

      setOptions(tmpOptions);
    }

    // update report
    const newSelected = newValue.map((record) => {
      const personName = record.person_name || record;
      const data = BibleStudies.getByName(personName);

      return { uid: data.uid, person_name: data.person_name };
    });

    setSelected(newSelected);

    const value = newSelected.map((record) => {
      return record.uid;
    });

    let currentReport = await UserS4Records.get(currentDate);

    if (!currentReport) {
      currentReport = await UserS4Records.initialize(currentDate);
    }

    currentReport.bibleStudies = value;
    currentReport.changes = currentReport.changes.filter((record) => record.field !== 'bibleStudies');
    currentReport.changes.push({ date: new Date(), field: 'bibleStudies', value });
    await currentReport.save();

    setScreenRefresh((prev) => !prev);

    // delete bible study
    if (reason === 'removeOption') {
      const id = details.option.uid;
      const bs = BibleStudies.get(id);
      const isActive = bs.isActive();

      if (!isActive) {
        const data = await BibleStudies.delete(id);

        const tmpOptions = data.map((record) => {
          return { uid: record.uid, person_name: record.person_name };
        });

        setOptions(tmpOptions);
      }
    }
  };

  const handleClose = () => {
    setOpenEditor(false);
  };

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

  useEffect(() => {
    if (openEditor) {
      const data = BibleStudies.list.map((record) => {
        return { uid: record.uid, person_name: record.person_name };
      });

      setOptions(data);
    }
  }, [openEditor]);

  useEffect(() => {
    const handleGetReportValue = async () => {
      const data = await UserS4Records.get(currentDate);
      if (data) {
        let tmpValue = [];

        if (data.bibleStudies.length > 0) {
          tmpValue = data.bibleStudies.map((record) => {
            const person = BibleStudies.get(record);

            return { uid: person.uid, person_name: person.person_name };
          });
        }

        setSelected(tmpValue);
      }

      const currentS4 = await UserS4MonthlyReport.get(month);
      if (currentS4) setIsSubmitted(currentS4.isSubmitted);
    };

    setSelected([]);
    handleGetReportValue();
  }, [currentDate, month, screenRefresh]);

  useEffect(() => {
    setBsCount(selected.length || '');
  }, [selected]);

  return (
    <Box sx={{ margin: '10px 0', display: 'flex', flexDirection: 'column', width: '280px' }}>
      <Dialog
        open={openEditor}
        onClose={handleClose}
        aria-labelledby="bible-study-dialog-close-title"
        aria-describedby="bible-study-dialog-description"
      >
        <DialogTitle id="bible-study-dialog-close-title" sx={{ fontSize: '16px', lineHeight: 1.2 }}>
          {t('bibleStudiesHeader')}
        </DialogTitle>
        <DialogContent sx={{ minWidth: '280px', maxWidth: '320px', minHeight: '160px' }}>
          <Autocomplete
            value={selected}
            multiple
            sx={{ marginTop: '15px' }}
            onChange={(event, newValue, reason, details) => handleUpdateBibleStudies(newValue, details, reason)}
            isOptionEqualToValue={(option, value) => option.person_name === value.person_name}
            filterSelectedOptions
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;

              const isExisting = options.some(
                (option) => inputValue.trim().toLowerCase() === option.person_name.toLowerCase()
              );

              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  person_name: inputValue,
                  label: t('addNewBibleStudyLabel', { name: inputValue }),
                  create: true,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            id="bible-studies-select-creatable"
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              if (option.label) return option.person_name;
              return option.person_name;
            }}
            renderOption={(props, option) => <li {...props}>{option.create ? option.label : option.person_name}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label={t('bibleStudies')} />}
          />
        </DialogContent>
      </Dialog>

      <Typography sx={{ lineHeight: 1.2, textAlign: 'center', fontSize: '13px', width: '280px', marginBottom: '5px' }}>
        {t('bibleStudies')}
      </Typography>

      <Box sx={{ display: 'flex', falignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '46px' }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth={true}
            sx={{ '.MuiOutlinedInput-input': { textAlign: 'center', fontSize: '18px' } }}
            InputProps={{ readOnly: true }}
            type="number"
            onClick={isSubmitted ? null : handleOpenEditor}
            value={bsCount}
          />
        </Box>
        <IconButton aria-label="add" color="secondary" disabled={isSubmitted} onClick={handleOpenEditor}>
          <EditIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default S4BibleStudiesField;
