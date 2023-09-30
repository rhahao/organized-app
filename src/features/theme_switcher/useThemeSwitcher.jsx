import { useRecoilState } from 'recoil';
import { isLightThemeState } from '@states/app';

const useThemeSwitcher = () => {
  const [isLight, setIsLight] = useRecoilState(isLightThemeState);

  const handleChangeTheme = () => {
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    setIsLight((prev) => !prev);
  };

  return { isLight, handleChangeTheme };
};

export default useThemeSwitcher;
