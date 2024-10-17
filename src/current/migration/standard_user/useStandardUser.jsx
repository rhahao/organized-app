import { useEffect, useState } from 'react';
import useSnackBar from '../hooks/useSnackBar';

const useStandardUser = () => {
  const { showMessage } = useSnackBar();

  const [isSwitchRef, setIsSwitchRef] = useState(false);

  useEffect(() => {
    const location = window.location;

    setIsSwitchRef(location.host !== 'organized-app.com');
  }, []);

  const handleOpenApp = () => {
    try {
      if (isSwitchRef) {
        window.open('https://organized-app.com', '_blank');
        return
      }
      
      throw new Error('Catch me');
    } catch (error) {
        console.error(error)
        
      showMessage(error.message, 'error');
    }
  };

  return { isSwitchRef, handleOpenApp };
};

export default useStandardUser;
