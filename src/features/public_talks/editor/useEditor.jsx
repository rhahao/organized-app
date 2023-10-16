import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { talkHistoryState } from '@states/schedules';
import { saveS34 } from '@services/dexie/publicTalks';

const useEditor = ({ public_talk, readOnly }) => {
  const talkHistory = useRecoilValue(talkHistoryState);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');

  const history = talkHistory.find((record) => record.talk_number === public_talk.talk_number);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setTitle(public_talk.talk_title || '');
  };

  const handleSave = async () => {
    await saveS34(public_talk.talk_number, title);
    setIsEdit(false);
  };

  useEffect(() => {
    let title = public_talk.talk_title;
    if (readOnly && history.last_delivered_formatted !== '') title += ` (${history.last_delivered_formatted})`;
    setTitle(title);
  }, [public_talk, history, readOnly]);

  return { isEdit, title, setTitle, handleEdit, handleCancel, handleSave };
};

export default useEditor;
