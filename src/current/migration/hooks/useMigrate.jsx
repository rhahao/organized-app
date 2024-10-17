import useSnackBar from './useSnackBar';

const useMigrate = () => {
  const { showMessage } = useSnackBar();

  const handleMigrateInPlace = async () => {
    try {
      // handle migration
    } catch (error) {
      console.error(error);

      showMessage(error.message, 'error');
    }
  };

  return { handleMigrateInPlace };
};

export default useMigrate;
