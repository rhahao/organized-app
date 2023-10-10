import { useEffect, useState } from 'react';
import { getRecentPersons } from '@services/cpe/persons';

const useRecents = () => {
  const [recentPersons, setRecentPersons] = useState([]);

  const clearRecentsStudents = () => {
    localStorage.removeItem('recentPersons');
    setRecentPersons([]);
  };

  useEffect(() => {
    const buildRecentStudents = async () => {
      const data = await getRecentPersons(localStorage.getItem('recentPersons'));
      setRecentPersons(data);
    };

    buildRecentStudents();
  }, []);

  return { clearRecentsStudents, recentPersons };
};

export default useRecents;
