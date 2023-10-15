import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { visitorIDState } from '@states/app';
import { formatDate } from '@services/dateformat';
import { useAppTranslation } from '@hooks/index';

const useVIPSessions = ({ session }) => {
  const { t } = useAppTranslation();

  const visitorID = useRecoilValue(visitorIDState);

  const [infoIP, setInfoIP] = useState('');

  const formatLastSeen = (last_seen) => {
    return last_seen ? formatDate(new Date(last_seen), t('shortDateTimeFormat')) : '';
  };

  const lastSeen = formatLastSeen(session.sws_last_seen);

  useEffect(() => {
    let result = session.visitor_details.ip;

    if (session.visitor_details.ipLocation?.country_name) {
      result += ` - ${session.visitor_details.ipLocation.country_name}`;
    }

    setInfoIP(result);
  }, [session.visitor_details]);

  return { visitorID, lastSeen, infoIP };
};

export default useVIPSessions;
