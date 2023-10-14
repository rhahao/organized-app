import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { shortDatePickerFormatState } from '@states/app';
import { personEditorRoleState } from '@states/settings';

const useTimeAwayItem = ({ timeAway, timeAways, setTimeAway }) => {
  const { timeAwayId } = timeAway;

  const shortDatePickerFormat = useRecoilValue(shortDatePickerFormatState);
  const isEditAllowed = useRecoilValue(personEditorRoleState);

  const [comments, setComments] = useState('');

  const handleInfoChange = (startDate, endDate, comments) => {
    if (timeAwayId) {
      const obj = timeAways.map((timeAway) =>
        timeAway.timeAwayId === timeAwayId
          ? {
              timeAwayId: timeAwayId,
              startDate: startDate,
              endDate: endDate,
              comments: comments,
            }
          : timeAway
      );
      setTimeAway(obj);
    }
  };

  const handleStartedChange = (newValue) => {
    handleInfoChange(newValue, timeAway.endDate, comments);
  };

  const handleExpiredChange = (newValue) => {
    handleInfoChange(timeAway.startDate, newValue, comments);
  };

  const handleCommentsChange = (value) => {
    setComments(value);
    handleInfoChange(timeAway.startDate, timeAway.endDate, value);
  };

  const handleRemoveTimeAway = () => {
    let obj = timeAways.filter((timeAway) => timeAway.timeAwayId !== timeAwayId);
    setTimeAway(obj);
  };

  return {
    shortDatePickerFormat,
    isEditAllowed,
    handleCommentsChange,
    handleStartedChange,
    handleExpiredChange,
    handleRemoveTimeAway,
    comments,
  };
};

export default useTimeAwayItem;
