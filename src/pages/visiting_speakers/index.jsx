import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccordionExtended from '@components/accordion/AccordionExtended';
import useVisitingSpeakers from './useVisitingSpeakers';
import {
  CongregationAdd,
  IncomingCongregationsHeader,
  IncomingSpeakers,
  LocalSpeakers,
  VisitingSpeakersHeader,
} from '@features/index';
import { useAppTranslation } from '@hooks/index';

const VisitingSpeakers = () => {
  const { t } = useAppTranslation();

  const {
    expanded,
    handleChange,
    congNumber,
    selfCong,
    handleToggleAccessOpen,
    speakersAccessOpen,
    isEditor,
    handleCongregationAdd,
    isCongregationAdd,
    setIsCongregationAdd,
    congsList,
  } = useVisitingSpeakers();

  return (
    <Box sx={{ marginBottom: '50px' }}>
      <Typography sx={{ marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold' }}>
        {t('visitingSpeakers')}
      </Typography>

      <Box>
        {/* Local Congregation */}
        <AccordionExtended expanded={expanded} content_id={congNumber} handleChange={handleChange}>
          <AccordionExtended.Summary>
            <VisitingSpeakersHeader cong={selfCong} isSelf={true} handleToggleAccessOpen={handleToggleAccessOpen} />
          </AccordionExtended.Summary>
          <AccordionExtended.Details>
            <LocalSpeakers speakersAccessOpen={speakersAccessOpen} />
          </AccordionExtended.Details>
        </AccordionExtended>
      </Box>

      {/* Incoming Congregations */}
      {isEditor && (
        <>
          <IncomingCongregationsHeader handleCongregationAdd={handleCongregationAdd} />

          <CongregationAdd isOpen={isCongregationAdd} setOpen={setIsCongregationAdd} />
        </>
      )}

      {/* Incoming Congregations List */}
      <Box sx={{ marginTop: '20px' }}>
        {congsList.map((cong) => (
          <AccordionExtended
            key={cong.cong_number}
            expanded={expanded}
            content_id={cong.cong_number}
            handleChange={handleChange}
          >
            <AccordionExtended.Summary>
              <VisitingSpeakersHeader cong={cong} />
            </AccordionExtended.Summary>
            <AccordionExtended.Details>
              <IncomingSpeakers cong={cong} />
            </AccordionExtended.Details>
          </AccordionExtended>
        ))}
      </Box>
    </Box>
  );
};

export default VisitingSpeakers;
