import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { PersonType } from '@definition/person';
import { fullnameOptionState } from '@states/settings';
import { buildPersonFullname } from '@utils/common';
import { reportUserSelectedMonthState } from '@states/user_field_service_reports';

const useReportItem = (person: PersonType) => {
  const month = useAtomValue(reportUserSelectedMonthState);
  const fullnameOption = useAtomValue(fullnameOptionState);

  const publisher_name = useMemo(() => {
    if (!person) return '';

    return buildPersonFullname(
      person.person_data.person_lastname.value,
      person.person_data.person_firstname.value,
      fullnameOption
    );
  }, [fullnameOption, person]);

  return { publisher_name, month };
};

export default useReportItem;
