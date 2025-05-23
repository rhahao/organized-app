import { useAtom } from 'jotai';
import { dbAppSettingsUpdate } from '@services/dexie/settings';
import { demoNoticeOpenState } from '@states/app';

const useNotice = () => {
  const [open, setOpen] = useAtom(demoNoticeOpenState);

  const handleClose = async () => {
    await dbAppSettingsUpdate({ 'cong_settings.cong_new': false });
    setOpen(false);
  };

  const handleOpenRealApp = () => {
    window.open('https://organized-app.com', '_blank', 'noopener');
  };

  return { open, handleClose, handleOpenRealApp };
};

export default useNotice;
