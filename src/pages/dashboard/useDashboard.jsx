import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fileDialog } from 'file-select-dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Badge from '@mui/material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GroupsIcon from '@mui/icons-material/Groups';
import HailIcon from '@mui/icons-material/Hail';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import NoteIcon from '@mui/icons-material/Note';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  accountTypeState,
  adminRoleState,
  coordinatorRoleState,
  elderLocalRoleState,
  lmmoRoleState,
  publicTalkCoordinatorRoleState,
  publisherRoleState,
  secretaryRoleState,
  sourceLangState,
} from '@states/settings';
import { congAccountConnectedState, isOnlineState } from '@states/app';
import {
  displaySnackNotification,
  displayUserConfirmation,
  setIsBackupDb,
  setIsRestoreDb,
  setMyAssignmentOpen,
  setWhatsNewOpen,
} from '@services/recoil/app';
import { useAppTranslation } from '@hooks/index';
import { setEpubFile, setIsImportEPUB, setIsImportJWOrg } from '@services/recoil/sources';
import { setPublishPocket } from '@services/recoil/schedules';
import { getCurrentExistingWeekDate } from '@services/dexie/schedules';
import { setIsAddSY } from '@services/recoil/serviceYear';
import { handleFetchSchedule } from '@services/cpe/schedules';

const isDev = import.meta.env.DEV;

const useDashboard = () => {
  const navigate = useNavigate();

  const { t } = useAppTranslation();

  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const adminRole = useRecoilValue(adminRoleState);
  const elderLocalRole = useRecoilValue(elderLocalRoleState);
  const fullMeetingEditor = lmmoRole && coordinatorRole && publicTalkCoordinatorRole;
  const sourceLang = useRecoilValue(sourceLangState);
  const isCongAccountConnected = useRecoilValue(congAccountConnectedState);
  const isOnline = useRecoilValue(isOnlineState);
  const accountType = useRecoilValue(accountTypeState);
  const publisherRole = useRecoilValue(publisherRoleState);

  const handleOpenMyAssignment = useCallback(() => {
    setWhatsNewOpen(false);
    setMyAssignmentOpen(true);
  }, []);

  const handleWeekAdd = useCallback(async () => {
    await displayUserConfirmation({
      title: t('sourceMaterial'),
      message: t('addWeekDesc'),
      action: 'manualWeekAdd',
    });
  }, [t]);

  const handleImportEPUB = useCallback(async () => {
    const file = await fileDialog({ accept: '.epub', strict: true });

    const epubLang = file.name.split('_')[1];
    if (epubLang && epubLang === sourceLang.toUpperCase()) {
      setEpubFile(file);
      setIsImportEPUB(true);
    } else {
      await displaySnackNotification({ message: t('invalidFilename'), severity: 'warning' });
    }
  }, [t, sourceLang]);

  const handleImportJWOrg = useCallback(() => {
    setIsImportJWOrg(true);
  }, []);

  const handleCreateBackup = useCallback(() => {
    setIsBackupDb(true);
  }, []);

  const handleRestoreBackup = useCallback(() => {
    setIsRestoreDb(true);
  }, []);

  const handlePublishPocket = useCallback(() => {
    setPublishPocket(true);
  }, []);

  const handleViewCurrentAssignment = useCallback(async () => {
    let weekDate = await getCurrentExistingWeekDate();
    weekDate = weekDate.replaceAll('/', '-');
    navigate(`/schedules/view/${weekDate}`);
  }, [navigate]);

  const handleOpenAddSY = useCallback(() => {
    setIsAddSY(true);
  }, []);

  const handleImportDummy = async () => {
    const { importDummyUsers } = await import('../../dev/index.js');
    importDummyUsers();
  };

  const dashboardMenus = useMemo(() => {
    return [
      {
        title: t('persons'),
        visible: accountType === 'vip' && elderLocalRole,
        links: [
          {
            title: t('persons'),
            icon: <PeopleIcon />,
            visible: true,
            navigateTo: '/persons',
          },
          {
            title: t('personAdd'),
            icon: <PersonAddIcon />,
            visible: lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole,
            navigateTo: '/persons/new',
          },
          {
            title: t('visitingSpeakers'),
            icon: <HailIcon />,
            visible: coordinatorRole || publicTalkCoordinatorRole,
            navigateTo: '/visiting-speakers',
          },
          {
            title: 'Dummy Import',
            icon: (
              <Badge badgeContent={'D'} color="error">
                <DownloadIcon />
              </Badge>
            ),
            visible: isDev && (lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole),
            action: handleImportDummy,
          },
        ],
      },
      {
        title: t('schedule'),
        visible: true,
        links: [
          {
            title: t('viewMyAssignments'),
            icon: <AssignmentIndIcon />,
            visible: true,
            action: handleOpenMyAssignment,
          },
          {
            title: t('viewAssignmentsSchedule'),
            icon: <ScheduleIcon />,
            visible: true,
            action: handleViewCurrentAssignment,
          },
          {
            title: t('midweekMeeting'),
            icon: <AssignmentIcon />,
            visible: accountType === 'vip' && lmmoRole,
            navigateTo: '/schedules',
          },
          {
            title: t('weekendMeeting'),
            icon: <CalendarMonthIcon />,
            visible: accountType === 'vip' && (coordinatorRole || publicTalkCoordinatorRole),
            navigateTo: '/weekend-schedules',
          },
          {
            title: t('publishPocket'),
            icon: <SendIcon />,
            visible:
              accountType === 'vip' &&
              (lmmoRole || coordinatorRole || publicTalkCoordinatorRole) &&
              isCongAccountConnected,
            action: handlePublishPocket,
          },
          {
            title: t('refreshSchedule'),
            icon: <CloudSyncIcon />,
            visible: isCongAccountConnected && !fullMeetingEditor,
            action: handleFetchSchedule,
          },
        ],
      },
      {
        title: t('sourceMaterial'),
        visible: accountType === 'vip' && (lmmoRole || coordinatorRole || publicTalkCoordinatorRole),
        links: [
          {
            title: t('viewSourceMaterial'),
            icon: <CalendarMonthIcon />,
            visible: true,
            navigateTo: '/source-materials',
          },
          {
            title: t('publicTalksList'),
            icon: <ListAltIcon />,
            visible: publicTalkCoordinatorRole,
            navigateTo: '/public-talks',
          },
          {
            title: t('weekAddNew'),
            icon: <MoreTimeIcon />,
            visible: true,
            action: handleWeekAdd,
          },
          {
            title: t('sourceImportEPUB'),
            icon: <FileCopyIcon />,
            visible: true,
            action: handleImportEPUB,
          },
          {
            title: t('sourceImportJw'),
            icon: <CloudSyncIcon />,
            visible: isOnline ? true : false,
            action: handleImportJWOrg,
          },
        ],
      },
      {
        title: t('reports'),
        visible: secretaryRole || publisherRole,
        links: [
          {
            title: t('myReports'),
            icon: <ListAltIcon />,
            visible: publisherRole,
            navigateTo: '/user-field-service-reports',
          },
          {
            title: t('postFieldServiceReport'),
            icon: <NoteIcon />,
            visible: accountType === 'vip' && secretaryRole,
            navigateTo: '/field-service-report',
          },
          {
            title: t('meetingAttendanceRecord'),
            icon: <MeetingRoomIcon />,
            visible: accountType === 'vip' && secretaryRole,
            navigateTo: '/meeting-attendance-record',
          },
          {
            title: t('branchOfficeReport'),
            icon: <ApartmentIcon />,
            visible: accountType === 'vip' && secretaryRole,
            navigateTo: '/branch-office-reports',
          },
          {
            title: t('addPreviousServiceYear'),
            icon: <PostAddIcon />,
            visible: accountType === 'vip' && secretaryRole,
            action: handleOpenAddSY,
          },
        ],
      },
      {
        title: t('congregation'),
        visible:
          adminRole ||
          lmmoRole ||
          secretaryRole ||
          coordinatorRole ||
          publicTalkCoordinatorRole ||
          (publisherRole && isCongAccountConnected),
        links: [
          {
            title: t('fieldServiceGroup'),
            icon: <GroupsIcon />,
            visible: secretaryRole,
            navigateTo: '/field-service-group',
          },
          {
            title: t('settings'),
            icon: <SettingsIcon />,
            visible: lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole,
            navigateTo: '/congregation-settings',
          },
          {
            title: t('sendBackup'),
            icon: <CloudUploadIcon />,
            visible: isCongAccountConnected ? true : false,
            action: handleCreateBackup,
          },
          {
            title: t('restoreBackup'),
            icon: <CloudDownloadIcon />,
            visible: isCongAccountConnected ? true : false,
            action: handleRestoreBackup,
          },
          {
            title: t('manageAccessToApps'),
            icon: <AccountCircleIcon />,
            visible: isCongAccountConnected && adminRole,
            navigateTo: '/administration',
          },
        ],
      },
    ];
  }, [
    accountType,
    handleCreateBackup,
    handleImportEPUB,
    handleImportJWOrg,
    handleOpenAddSY,
    handleOpenMyAssignment,
    handlePublishPocket,
    handleRestoreBackup,
    handleViewCurrentAssignment,
    handleWeekAdd,
    isCongAccountConnected,
    isOnline,
    t,
    adminRole,
    coordinatorRole,
    lmmoRole,
    elderLocalRole,
    publicTalkCoordinatorRole,
    secretaryRole,
    publisherRole,
    fullMeetingEditor,
  ]);

  return { dashboardMenus };
};

export default useDashboard;
