import { useNavigate } from 'react-router-dom';

const useUser = ({ person }) => {
  const { id } = person;

  const navigate = useNavigate();

  const handleOpenDetails = () => {
    navigate(`/administration/members/${id}`);
  };

  return { handleOpenDetails };
};

export default useUser;
