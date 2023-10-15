import { useEffect, useState } from 'react';
import { formatDate } from '@services/dateformat';
import { useAppTranslation } from '@hooks/index';

const usePocketDevices = ({ device }) => {
  const { t } = useAppTranslation();

  const [infoIP, setInfoIP] = useState('');

  const formatLastSeen = (last_seen) => {
    return last_seen ? formatDate(new Date(last_seen), t('shortDateTimeFormat')) : '';
  };

  const lastSeen = formatLastSeen(device.sws_last_seen);

  useEffect(() => {
    let result = '';

    if (device.visitor_details) {
      result = device.visitor_details.ip;

      if (device.visitor_details.ipLocation?.country_name) {
        result += ` - ${device.visitor_details.ipLocation.country_name}`;
      }
    }

    setInfoIP(result);
  }, [device.visitor_details]);

  return { lastSeen, infoIP };
};

export default usePocketDevices;
