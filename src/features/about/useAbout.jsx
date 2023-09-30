import { useRecoilState } from 'recoil';
import { isAboutOpenState } from '@states/app';

const currentYear = new Date().getFullYear();

const useAbout = () => {
  const [isOpen, setIsOpen] = useRecoilState(isAboutOpenState);

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, handleClose, currentYear };
};

export default useAbout;
