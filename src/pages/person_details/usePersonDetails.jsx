import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMediaQuery, useTheme } from '@mui/material';
import { currentReportMonth } from '@services/cpe/serviceYear';
import { personEditorRoleState } from '@states/settings';
import { personsActiveState } from '@states/persons';
import { assignmentsHistoryState } from '@states/schedules';

const usePersonDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });

  const isPersonEditor = useRecoilValue(personEditorRoleState);
  const activePersons = useRecoilValue(personsActiveState);
  const assignmentsHistory = useRecoilValue(assignmentsHistoryState);

  const [isProcessing, setIsProcessing] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [historyAssignments, setHistoryAssignments] = useState([]);
  const [timeAway, setTimeAway] = useState([]);
  const [expanded, setExpanded] = useState('panel1');
  const [person, setPerson] = useState({});
  const [birthDate, setBirthDate] = useState(null);
  const [immersedDate, setImmersedDate] = useState(null);
  const [isBaptized, setIsBaptized] = useState(false);
  const [isAnointed, setIsAnointed] = useState(false);
  const [isOtherSheep, setIsOtherSheep] = useState(true);
  const [personEmail, setPersonEmail] = useState('');
  const [personAddress, setPersonAddress] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  const [spiritualStatus, setSpiritualStatus] = useState([]);
  const [otherService, setOtherService] = useState([]);
  const [firstMonthReport, setFirstMonthReport] = useState(currentReportMonth());

  const handleNavigatePersons = () => {
    navigate('/persons');
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, person_name: name };
    });
  }, [name]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, person_displayName: displayName };
    });
  }, [displayName]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, isMale };
    });
  }, [isMale]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, isFemale };
    });
  }, [isFemale]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, assignments };
    });
  }, [assignments]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, timeAway };
    });
  }, [timeAway]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, birthDate };
    });
  }, [birthDate]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, isBaptized };
    });
  }, [isBaptized]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, immersedDate };
    });
  }, [immersedDate]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, isOtherSheep };
    });
  }, [isOtherSheep]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, isAnointed };
    });
  }, [isAnointed]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, firstMonthReport };
    });
  }, [firstMonthReport]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, email: personEmail };
    });
  }, [personEmail]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, address: personAddress };
    });
  }, [personAddress]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, phone: personPhone };
    });
  }, [personPhone]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, spiritualStatus };
    });
  }, [spiritualStatus]);

  useEffect(() => {
    setPerson((prev) => {
      return { ...prev, otherService };
    });
  }, [otherService]);

  useEffect(() => {
    if (!id) {
      setIsEdit(false);
    }

    if (id) {
      const data = activePersons.find((person) => person.person_uid === id);
      if (data) {
        setPerson(data);
        setName(data.person_name);
        setDisplayName(data.person_displayName);
        setIsMale(data.isMale);
        setIsFemale(data.isFemale);
        setBirthDate(data.birthDate);
        setIsBaptized(data.isBaptized);
        setImmersedDate(data.immersedDate);
        setIsOtherSheep(data.isOtherSheep);
        setIsAnointed(data.isAnointed);
        setFirstMonthReport(data.firstMonthReport);
        setAssignments(data.assignments);
        setTimeAway(data.timeAway);
        setPersonEmail(data.email);
        setPersonAddress(data.address);
        setPersonPhone(data.phone);
        setSpiritualStatus(data.spiritualStatus || []);
        setOtherService(data.otherService || []);

        const personAssignments = assignmentsHistory.filter((assignment) => assignment.person_uid === id);
        setHistoryAssignments(personAssignments);

        setIsEdit(true);
      }
    }

    setIsProcessing(false);
  }, [activePersons, id, assignmentsHistory]);

  return {
    isProcessing,
    lgUp,
    isPersonEditor,
    isEdit,
    historyAssignments,
    expanded,
    person,
    handleNavigatePersons,
    handleChange,
    isMale,
    setIsMale,
    name,
    setName,
    isFemale,
    setIsFemale,
    displayName,
    setDisplayName,
    birthDate,
    setBirthDate,
    personEmail,
    setPersonEmail,
    personAddress,
    setPersonAddress,
    personPhone,
    setPersonPhone,
    immersedDate,
    setImmersedDate,
    isBaptized,
    setIsBaptized,
    isOtherSheep,
    setIsOtherSheep,
    isAnointed,
    setIsAnointed,
    firstMonthReport,
    setFirstMonthReport,
    spiritualStatus,
    setSpiritualStatus,
    otherService,
    setOtherService,
    assignments,
    setAssignments,
    timeAway,
    setTimeAway,
  };
};

export default usePersonDetails;
