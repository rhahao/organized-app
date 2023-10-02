import { useRecoilValue } from 'recoil';
import {
  congSpeakersRequestsStateCountState,
  congSpeakersRequestsUpdateCountState,
  isWhatsNewOpenState,
  pendingFieldServiceReportsCountState,
} from '@states/app';
import { countAnnouncementsState } from '@states/announcements';
import { setWhatsNewOpen } from '@services/recoil/app';

const useWhatsNew = () => {
  const drawerOpen = useRecoilValue(isWhatsNewOpenState);
  const cnNews = useRecoilValue(countAnnouncementsState);
  const cnPendingReports = useRecoilValue(pendingFieldServiceReportsCountState);
  const cnSpeakersRequests = useRecoilValue(congSpeakersRequestsStateCountState);
  const cnSpeakersRequestsApproved = useRecoilValue(congSpeakersRequestsUpdateCountState);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setWhatsNewOpen(open);
  };

  return {
    cnNews,
    cnPendingReports,
    cnSpeakersRequests,
    cnSpeakersRequestsApproved,
    drawerOpen,
    toggleDrawer,
    setWhatsNewOpen,
  };
};

export default useWhatsNew;
