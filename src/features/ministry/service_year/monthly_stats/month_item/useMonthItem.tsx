import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { MonthItemProps, MonthStatusType } from './index.types';
import { monthNamesState } from '@states/app';
import { currentMonthServiceYear } from '@utils/date';
import { personIsEnrollmentActive } from '@services/app/persons';
import { userLocalUIDState } from '@states/settings';
import useMinistryMonthlyRecord from '@features/ministry/hooks/useMinistryMonthlyRecord';

const useMonthItem = ({ month, person }: MonthItemProps) => {
  const monthNames = useAtomValue(monthNamesState);
  const userUID = useAtomValue(userLocalUIDState);

  const { status, bible_studies, hours_total, comments } =
    useMinistryMonthlyRecord({ month, person_uid: userUID, publisher: true });

  const monthname = useMemo(() => {
    const monthIndex = +month.split('/')[1] - 1;
    return monthNames[monthIndex];
  }, [month, monthNames]);

  const isCurrent = useMemo(() => {
    const current = currentMonthServiceYear();

    return month === current;
  }, [month]);

  const isAhead = useMemo(() => {
    const current = currentMonthServiceYear();

    return month > current;
  }, [month]);

  const monthStatus: MonthStatusType = useMemo(() => {
    if (status !== 'pending') return status as MonthStatusType;

    const currentMonth = currentMonthServiceYear();

    if (month >= currentMonth) return status;

    return 'late';
  }, [status, month]);

  const isAP = useMemo(() => {
    return personIsEnrollmentActive(person, 'AP', month);
  }, [person, month]);

  const isFR = useMemo(() => {
    return personIsEnrollmentActive(person, 'FR', month);
  }, [person, month]);

  const isFS = useMemo(() => {
    return personIsEnrollmentActive(person, 'FS', month);
  }, [person, month]);

  const isFMF = useMemo(() => {
    return personIsEnrollmentActive(person, 'FMF', month);
  }, [person, month]);

  const showHours = useMemo(() => {
    return isAP || isFR || isFS || isFMF;
  }, [isAP, isFR, isFS, isFMF]);

  const total_hours = useMemo(() => {
    return +hours_total.split(':').at(0);
  }, [hours_total]);

  return {
    monthname,
    monthStatus,
    bible_studies,
    total_hours,
    isAP,
    comments,
    isCurrent,
    isAhead,
    showHours,
  };
};

export default useMonthItem;
