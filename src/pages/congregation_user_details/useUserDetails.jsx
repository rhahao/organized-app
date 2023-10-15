import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import {
  apiDeleteCongregationUser,
  apiDeletePocketCode,
  apiDeletePocketDevice,
  apiGeneratePocketCode,
  apiRevokeVIPUserSession,
  apiSavePocketUser,
  apiSaveVIPUser,
} from '@services/api/congregation';
import { useFirebaseAuth } from '@hooks/index';
import { handleUpdateSetting } from '@services/dexie/settings';

const useUserDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const query = queryClient.getQueryData(['congPersons']);
  const person = query?.data?.find((person) => person.id === id);

  const { user } = useFirebaseAuth();

  const [member, setMember] = useState(person);

  const handleBackAdmin = () => {
    navigate('/administration');
  };

  const handleCheckAdmin = (value) => {
    let role = [];
    if (value) {
      role = ['admin', ...member.cong_role];
    } else {
      role = member.cong_role.filter((role) => role !== 'admin');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckSecretary = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'secretary'];
    } else {
      role = member.cong_role.filter((role) => role !== 'secretary');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckLMMO = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'lmmo'];
    } else {
      role = member.cong_role.filter((role) => role !== 'lmmo');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckLMMOAssistant = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'lmmo-backup'];
    } else {
      role = member.cong_role.filter((role) => role !== 'lmmo-backup');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckPublicTalkCoordinator = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'public_talk_coordinator'];
    } else {
      role = member.cong_role.filter((role) => role !== 'public_talk_coordinator');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckCoordinator = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'coordinator'];
    } else {
      role = member.cong_role.filter((role) => role !== 'coordinator');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleCheckViewMeetingSchedule = (value) => {
    let role = [];
    if (value) {
      role = [...member.cong_role, 'view_meeting_schedule'];
    } else {
      role = member.cong_role.filter((role) => role !== 'view_meeting_schedule');
    }

    setMember((prev) => {
      return { ...prev, cong_role: role };
    });
  };

  const handleUpdatePocketCode = (value) => {
    setMember((prev) => {
      return { ...prev, pocket_oCode: value };
    });
  };

  const handleUpdatePocketDevices = (value) => {
    setMember((prev) => {
      return { ...prev, pocket_devices: value };
    });
  };

  const handleUpdateUserSessions = (value) => {
    setMember((prev) => {
      return { ...prev, sessions: value };
    });
  };

  const handleUpdateUserDelegate = (value) => {
    const newValue = value.map((selected) => {
      return { person_uid: selected.user_local_uid };
    });

    setMember((prev) => {
      return { ...prev, user_members_delegate: newValue };
    });
  };

  const handleUpdatePocketLocalId = (value) => {
    setMember((prev) => {
      return {
        ...prev,
        user_local_uid: value === null ? '' : value.person_uid,
      };
    });
  };

  const handleGenerateOCode = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiGeneratePocketCode(id);

      if (status === 200) {
        handleUpdatePocketCode(data.code);
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });
      } else {
        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });
      }

      await setRootModalOpen(false);
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleDeleteOCode = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiDeletePocketCode(id);

      if (status === 200) {
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });

        if (data.message === 'POCKET_CODE_REMOVED') {
          handleUpdatePocketCode('');
        } else {
          navigate('/administration');
        }
      } else {
        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });
      }

      await setRootModalOpen(false);
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleDeleteDevice = async (pocket_visitorid) => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiDeletePocketDevice(id, pocket_visitorid);

      if (status === 200) {
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });

        if (data.devices) {
          handleUpdatePocketDevices(data.devices);
        }

        if (data.message === 'POCKET_USER_DELETED') {
          navigate('/administration');
        }

        await setRootModalOpen(false);

        return;
      }

      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'warning',
      });
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleRevokeSession = async (visitorid) => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiRevokeVIPUserSession(id, visitorid);

      if (status === 200) {
        handleUpdateUserSessions(data);
        await setRootModalOpen(false);
        return;
      }

      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'warning',
      });
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleSaveCongPerson = async () => {
    try {
      await setRootModalOpen(true);

      let status, data;

      if (person.global_role === 'pocket') {
        const result = await apiSavePocketUser(
          person.id,
          member.cong_role,
          member.user_members_delegate,
          member.user_local_uid
        );

        status = result.status;
        data = result.data;
      } else {
        const result = await apiSaveVIPUser(
          person.id,
          member.cong_role,
          member.user_members_delegate,
          member.user_local_uid
        );

        status = result.status;
        data = result.data;
      }

      if (status === 200) {
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });

        if (user.email === person.user_uid) {
          await handleUpdateSetting({
            user_members_delegate: member.user_members_delegate,
            cong_role: member.cong_role,
          });
          window.location.reload();
        }

        await setRootModalOpen(false);
        return;
      }

      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'warning',
      });
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleRemoveCongPerson = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiDeleteCongregationUser(person.id);

      if (status === 200) {
        await setRootModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['congPersons'] });
        navigate('/administration');
        return;
      }

      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'warning',
      });
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  if (!person) return <Navigate to="/administration" />;

  return {
    handleCheckAdmin,
    handleCheckSecretary,
    handleCheckLMMO,
    handleCheckLMMOAssistant,
    handleCheckPublicTalkCoordinator,
    handleCheckCoordinator,
    handleCheckViewMeetingSchedule,
    handleUpdatePocketCode,
    handleUpdatePocketDevices,
    handleUpdateUserSessions,
    handleUpdateUserDelegate,
    handleUpdatePocketLocalId,
    handleBackAdmin,
    handleGenerateOCode,
    handleDeleteOCode,
    handleDeleteDevice,
    handleRevokeSession,
    handleSaveCongPerson,
    handleRemoveCongPerson,
    person,
    user,
    member,
  };
};

export default useUserDetails;
