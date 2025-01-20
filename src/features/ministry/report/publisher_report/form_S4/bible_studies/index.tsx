import { Box } from '@mui/material';
import { useBreakpoints } from '@hooks/index';
import { FieldContainer } from '../shared_styles';
import { FormS4Props } from '../index.types';
import useBibleStudies from './useBibleStudies';
import StandardEditor from '@features/ministry/report/standard_editor';
import BibleStudySelector from './bible_study_selector';
import BibleStudiesList from './bible_studies_list';

const BibleStudies = (props: FormS4Props) => {
  const { tabletUp } = useBreakpoints();

  const {
    value,
    handleBibleStudyChange,
    readOnly,
    bibleStudyRef,
    isSelf,
    handleCheckSelected,
    handleBibleStudyRecordsChange,
    bible_studies_records,
    handleBibleStudyDelete,
    bibleStudiesValidator,
  } = useBibleStudies(props);

  return (
    <FieldContainer
      sx={{ gap: '4px', alignItems: tabletUp ? 'flex-start' : 'center' }}
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
          editable={props.publisher && isSelf}
          handleCheckSelected={handleCheckSelected}
          onChange={handleBibleStudyRecordsChange}
        />

        <StandardEditor
          readOnly={readOnly}
          value={value}
          onChange={handleBibleStudyChange}
          validator={bibleStudiesValidator}
        />
      </Box>
      <BibleStudiesList
        readOnly={readOnly}
        bibleStudies={bible_studies_records}
        onDelete={handleBibleStudyDelete}
      />
    </FieldContainer>
  );
};

export default BibleStudies;
