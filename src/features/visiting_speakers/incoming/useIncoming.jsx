import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { publicTalkCoordinatorRoleState } from '@states/settings';
import { generateDisplayName } from '@utils/common';
import { addVisitingSpeaker, deleteVisitingSpeaker, updateSpeakerDetails } from '@services/dexie/visitingSpeakers';

const useIncoming = ({ isNew, speaker, cong_number }) => {
  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);

  const [speakerName, setSpeakerName] = useState('');
  const [speakerDisplayName, setSpeakerDisplayName] = useState('');
  const [speakerIsElder, setSpeakerIsElder] = useState(false);
  const [speakerIsMS, setSpeakerIsMS] = useState(false);
  const [speakerEmail, setSpeakerEmail] = useState('');
  const [speakerPhone, setSpeakerPhone] = useState('');

  const readOnly = speaker ? !speaker.is_local : isEditor ? false : true;

  const handleCancel = () => {
    if (isNew) {
      setSpeakerName('');
      setSpeakerDisplayName('');
      setSpeakerIsElder(false);
      setSpeakerIsMS(false);
      setSpeakerEmail('');
      setSpeakerPhone('');
    }
  };

  const handleNameChange = async (value) => {
    setSpeakerName(value);

    const tmp = generateDisplayName(value);
    setSpeakerDisplayName(tmp);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'person_name',
        fieldValue: value,
      });

      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'person_displayName',
        fieldValue: tmp,
      });
    }
  };

  const handleDisplayNameChange = async (value) => {
    setSpeakerDisplayName(value);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'person_displayName',
        fieldValue: value,
      });
    }
  };

  const handleElderCheck = async (value) => {
    setSpeakerIsElder(value);
    setSpeakerIsMS(!value);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'is_elder',
        fieldValue: value,
      });

      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'is_ms',
        fieldValue: !value,
      });
    }
  };

  const handleMSCheck = async (value) => {
    setSpeakerIsMS(value);
    setSpeakerIsElder(!value);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'is_ms',
        fieldValue: value,
      });

      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'is_elder',
        fieldValue: !value,
      });
    }
  };

  const handleEmailChange = async (value) => {
    setSpeakerEmail(value);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'email',
        fieldValue: value,
      });
    }
  };

  const handlePhoneChange = async (value) => {
    setSpeakerPhone(value);

    if (!isNew) {
      await updateSpeakerDetails({
        cong_number: cong_number,
        person_uid: speaker.person_uid,
        fieldName: 'phone',
        fieldValue: value,
      });
    }
  };

  const handleAddSpeaker = async () => {
    await addVisitingSpeaker({
      is_self: false,
      person_uid: window.crypto.randomUUID(),
      person_name: speakerName,
      person_displayName: speakerDisplayName,
      is_elder: speakerIsElder,
      is_ms: speakerIsMS,
      cong_number: cong_number,
      email: speakerEmail,
      phone: speakerPhone,
    });

    handleCancel();
  };

  const handleDeleteSpeaker = async () => {
    await deleteVisitingSpeaker({
      person_uid: speaker.person_uid,
      cong_number: speaker.cong_number,
    });
  };

  useEffect(() => {
    if (speaker) {
      setSpeakerName(speaker.person_name);
      setSpeakerDisplayName(speaker.person_displayName);
      setSpeakerIsElder(speaker.is_elder);
      setSpeakerIsMS(speaker.is_ms);
      setSpeakerEmail(speaker.email);
      setSpeakerPhone(speaker.phone);
    }
  }, [speaker]);

  return {
    speakerName,
    speakerDisplayName,
    speakerIsElder,
    speakerIsMS,
    speakerEmail,
    speakerPhone,
    readOnly,
    handleNameChange,
    handleDisplayNameChange,
    handleElderCheck,
    handleMSCheck,
    handleEmailChange,
    handlePhoneChange,
    handleAddSpeaker,
    handleDeleteSpeaker,
    handleCancel,
  };
};

export default useIncoming;
