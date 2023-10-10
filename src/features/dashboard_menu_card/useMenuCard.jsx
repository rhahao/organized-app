import { useRecoilValue } from 'recoil';
import { themeOptionsState } from '@states/app';
import { useNavigate } from 'react-router-dom';

const useMenuCard = ({ menu }) => {
  const navigate = useNavigate();

  const theme = useRecoilValue(themeOptionsState);

  const { title, links, visible } = menu;

  const handleAction = (link) => {
    if (link.navigateTo) {
      navigate(link.navigateTo);
    }

    if (link.action) {
      link.action();
    }
  };

  return { title, links, visible, handleAction, theme };
};

export default useMenuCard;
