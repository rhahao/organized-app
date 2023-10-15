import { Suspense, lazy } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import PrivatePublisherRoute from '@routes/PrivatePublisherRoute';
import PrivateElderRoute from '@routes/PrivateElderRoute';
import PrivateVipRoute from '@routes/PrivateVipRoute';
import PrivateLMMORoute from '@routes/PrivateLMMORoute';
import PrivateMeetingEditorRoute from '@routes/PrivateMeetingEditorRoute';
import PrivateSecretaryRoute from '@routes/PrivateSecretaryRoute';
import PrivatePublicTalkCoordinatorRoute from '@routes/PrivatePublicTalkCoordinatorRoute';
import PrivateWeekendMeetingRoute from '@routes/PrivateWeekendMeetingRoute';
import PrivateVipConnectedRoute from '@routes/PrivateVipConnectedRoute';
import { useGlobal } from '@hooks';
import { WaitingCircular, ErrorBoundary } from '@components';
import { RootLayout } from '@layouts';
import { NotificationWrapper } from '@wrapper';

// lazy loading
const Administration = lazy(() => import('@pages/administration'));
const DashboardMenu = lazy(() => import('@pages/dashboard'));
const Persons = lazy(() => import('@pages/persons'));
const PersonDetails = lazy(() => import('@pages/person_details'));
const Schedules = lazy(() => import('@pages/Schedules'));
const ScheduleDetails = lazy(() => import('@pages/ScheduleDetails'));
const S89Print = lazy(() => import('@pages/S89Print'));
const ScheduleWeekDetails = lazy(() => import('@pages/ScheduleWeekDetails'));
const UserSettings = lazy(() => import('@pages/user_settings'));
const SourceMaterials = lazy(() => import('@pages/SourceMaterials'));
const SourceWeekDetails = lazy(() => import('@pages/SourceWeekDetails'));
const CongregationUserDetails = lazy(() => import('@pages/congregation_user_details'));
const WeeklyAssignments = lazy(() => import('@pages/WeeklyAssignments'));
const CongregationSettings = lazy(() => import('@pages/CongregationSettings'));
const FieldServiceGroup = lazy(() => import('@pages/FieldServiceGroup'));
const MeetingAttendance = lazy(() => import('@pages/MeetingAttendance'));
const FieldServiceReport = lazy(() => import('@pages/FieldServiceReport'));
const BranchOfficeReports = lazy(() => import('@pages/BranchOfficeReports'));
const UserFieldServiceReport = lazy(() => import('@pages/UserFieldServiceReport'));
const UserBibleStudies = lazy(() => import('@pages/UserBibleStudies'));
const PendingFieldServiceReports = lazy(() => import('@pages/PendingFieldServiceReports'));
const PublicTalksList = lazy(() => import('@pages/PublicTalksList'));
const WeekendMeetingSchedule = lazy(() => import('@pages/WeekendMeetingSchedule'));
const VisitingSpeakers = lazy(() => import('@pages/visiting_speakers'));

const queryClient = new QueryClient();

const App = ({ updatePwa }) => {
  const {
    isLoading,
    isSupported,
    activeTheme,
    appSnackOpen,
    adminRole,
    coordinatorRole,
    elderLocalRole,
    lmmoRole,
    publicTalkCoordinatorRole,
    publisherRole,
    secretaryRole,
    isCongAccountConnected,
  } = useGlobal();

  const router = createHashRouter([
    {
      element: <RootLayout updatePwa={updatePwa} />,
      errorElement: <ErrorBoundary />,
      children: [
        { path: '/', element: <DashboardMenu /> },
        {
          path: '/schedules/view/:weekToFormat',
          element: <WeeklyAssignments />,
        },
        {
          path: '/user-settings',
          element: <UserSettings />,
        },
        {
          element: <PrivatePublisherRoute isPublisher={publisherRole} />,
          children: [
            { path: '/user-field-service-reports', element: <UserFieldServiceReport /> },
            { path: '/user-bible-studies', element: <UserBibleStudies /> },
          ],
        },
        {
          element: <PrivateElderRoute isElder={elderLocalRole} />,
          children: [
            {
              path: '/persons',
              element: <Persons />,
            },
            {
              path: '/persons/:id',
              element: <PersonDetails />,
            },
            {
              element: (
                <PrivateVipRoute
                  isLMMO={lmmoRole}
                  isSecretary={secretaryRole}
                  isCoordinator={coordinatorRole}
                  isPublicTalkCoordinator={publicTalkCoordinatorRole}
                />
              ),
              children: [
                {
                  path: '/persons/new',
                  element: <PersonDetails />,
                },
                {
                  element: <PrivateLMMORoute isLMMO={lmmoRole} />,
                  children: [
                    {
                      path: '/schedules',
                      element: <Schedules />,
                    },
                    {
                      path: '/schedules/:schedule',
                      element: <ScheduleDetails />,
                    },
                    {
                      path: '/schedules/:schedule/:weekToFormat',
                      element: <ScheduleWeekDetails />,
                    },
                    {
                      path: '/assignment-form',
                      element: <S89Print />,
                    },
                  ],
                },
                {
                  element: (
                    <PrivateMeetingEditorRoute
                      isMeetingEditor={lmmoRole || coordinatorRole || publicTalkCoordinatorRole}
                    />
                  ),
                  children: [
                    {
                      path: '/source-materials',
                      element: <SourceMaterials />,
                    },
                    {
                      path: '/source-materials/:weekToFormat',
                      element: <SourceWeekDetails />,
                    },
                  ],
                },
                {
                  element: <PrivateSecretaryRoute isSecretary={secretaryRole} />,
                  children: [
                    {
                      path: '/field-service-group',
                      element: <FieldServiceGroup />,
                    },
                    {
                      path: '/meeting-attendance-record',
                      element: <MeetingAttendance />,
                    },
                    {
                      path: '/field-service-report',
                      element: <FieldServiceReport />,
                    },
                    {
                      path: '/branch-office-reports',
                      element: <BranchOfficeReports />,
                    },
                    {
                      path: '/pending-field-service-reports',
                      element: <PendingFieldServiceReports />,
                    },
                  ],
                },
                {
                  element: <PrivatePublicTalkCoordinatorRoute isPublicTalkCoordinator={publicTalkCoordinatorRole} />,
                  children: [
                    {
                      path: '/public-talks',
                      element: <PublicTalksList />,
                    },
                    {
                      path: '/visiting-speakers',
                      element: <VisitingSpeakers />,
                    },
                  ],
                },
                {
                  element: (
                    <PrivateWeekendMeetingRoute isWeekendMeetingRole={publicTalkCoordinatorRole || coordinatorRole} />
                  ),
                  children: [
                    {
                      path: '/weekend-schedules',
                      element: <WeekendMeetingSchedule />,
                    },
                  ],
                },
              ],
            },
            {
              path: '/congregation-settings',
              element: <CongregationSettings />,
            },
            {
              element: <PrivateVipConnectedRoute isCongAccountConnected={isCongAccountConnected} isAdmin={adminRole} />,
              children: [
                {
                  path: '/administration',
                  element: <Administration />,
                },
                {
                  path: '/administration/members/:id',
                  element: <CongregationUserDetails />,
                },
              ],
            },
          ],
        },
        { path: '*', element: <DashboardMenu /> },
      ],
    },
  ]);

  if (isLoading) {
    return <WaitingCircular />;
  }

  return (
    <>
      {!isSupported && (
        <div className="browser-not-supported">
          You are using unsupported browser for the Congregation Program for Everyone app. Make sure that your browser
          is up to date, or try to use another browser.
        </div>
      )}
      {isSupported && (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <Suspense fallback={<WaitingCircular />}>
              {appSnackOpen && <NotificationWrapper />}
              <RouterProvider router={router} />
            </Suspense>
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </>
  );
};

App.propTypes = {
  updatePwa: PropTypes.func,
};

export default App;
