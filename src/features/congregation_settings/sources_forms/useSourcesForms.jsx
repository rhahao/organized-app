import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { coordinatorRoleState, lmmoRoleState, sourceLangState } from '@states/settings';
import { LANGUAGE_LIST } from '@constants/index';
import { handleUpdateSetting } from '@services/dexie/settings';

const useSourcesForms = () => {
  const sourceLang = useRecoilValue(sourceLangState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);

  const isEditor = lmmoRole || coordinatorRole;

  const [tempSourceLang, setTempSourceLang] = useState(sourceLang);

  const listSourceLangs = LANGUAGE_LIST.filter((lang) => lang.isSource === true);

  const handleSourceLangChange = async (e) => {
    if (e.target.value === 'not_set') return;
    setTempSourceLang(e.target.value);
    await handleUpdateSetting({ source_lang: e.target.value });
  };

  return { isEditor, tempSourceLang, listSourceLangs, handleSourceLangChange };
};

export default useSourcesForms;
