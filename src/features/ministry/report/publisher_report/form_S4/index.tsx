import { Stack } from '@mui/material';
import { IconSend } from '@components/icons';
import { useAppTranslation } from '@hooks/index';
import { FormS4Props } from './index.types';
import BibleStudies from './bible_studies';
import Button from '@components/button';
import Comments from './comments';
import Divider from '@components/divider';
import MinistryShared from './ministry_shared';

const FormS4 = ({ month, person_uid, publisher }: FormS4Props) => {
  const { t } = useAppTranslation();

  return (
    <Stack spacing="16px">
      <MinistryShared
        month={month}
        person_uid={person_uid}
        publisher={publisher}
      />

      <Divider color="var(--accent-200)" />

      <Stack spacing="16px" divider={<Divider color="var(--accent-200)" />}>
        <BibleStudies
          month={month}
          person_uid={person_uid}
          publisher={publisher}
        />
      </Stack>

      <Divider color="var(--accent-200)" />

      <Comments month={month} person_uid={person_uid} publisher={publisher} />

      <Button variant="main" startIcon={<IconSend />}>
        {t('tr_btnSubmitReport')}
      </Button>
    </Stack>
  );
};

export default FormS4;
