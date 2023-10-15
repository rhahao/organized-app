import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { personsActiveState } from '@states/persons';
import { displaySnackNotification, setIsCongPersonAdd, setRootModalOpen } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { apiCreatePocketUser, apiCreateVIPUser, apiSearchVIPUser } from '@services/api/congregation';
import { isCongPersonAddState } from '@states/app';

const useCreateUser = () => {
  const queryClient = useQueryClient();

  const congMembers = queryClient.getQueryData(['congPersons']);

  const persons = useRecoilValue(personsActiveState);
  const open = useRecoilValue(isCongPersonAddState);

  const [value, setValue] = useState('vip');
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNoFound] = useState(false);
  const [found, setFound] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [foundMember, setFoundMember] = useState({});
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [selectedPocket, setSelectedPocket] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClose = async () => {
    await setIsCongPersonAdd(false);
  };

  const handleSearch = async () => {
    try {
      if (search !== '') {
        setNoFound(false);
        setFound(false);
        setIsMember(false);
        setIsSearching(true);

        const { status, data } = await apiSearchVIPUser(search);

        if (status === 200) {
          if (data.message) {
            setIsMember(true);
          } else {
            setFoundMember(data);
            setFound(true);
          }
        } else if (status === 404) {
          setNoFound(true);
        } else {
          await displaySnackNotification({
            message: getMessageByCode(data.message),
            severity: 'error',
          });
        }

        setIsSearching(false);
      }
    } catch (err) {
      setIsSearching(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleCreateCongUser = async () => {
    try {
      await setRootModalOpen(true);

      let status, data;

      if (selectedPocket) {
        const result = await apiCreatePocketUser(selectedPocket.person_name, selectedPocket.person_uid);

        status = result.status;
        data = result.data;
      } else {
        const result = await apiCreateVIPUser(foundMember.id);
        status = result.status;
        data = result.data;
      }

      if (status === 200) {
        setRootModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });
        await setRootModalOpen(false);
        await setIsCongPersonAdd(false);
        return;
      }

      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'error',
      });
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    let newMembers = persons;
    congMembers.data.forEach((member) => {
      newMembers = newMembers.filter((item) => item.person_uid !== member.user_local_uid);
    });

    setFilteredPersons(newMembers);
  }, [congMembers, persons]);

  return {
    open,
    value,
    search,
    setSearch,
    isSearching,
    notFound,
    found,
    isMember,
    filteredPersons,
    setSelectedPocket,
    selectedPocket,
    handleChange,
    handleClose,
    handleSearch,
    handleCreateCongUser,
  };
};

export default useCreateUser;
