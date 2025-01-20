import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userFieldServiceMonthlyReportsState } from '@states/user_field_service_reports';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { congFieldServiceReportsState } from '@states/field_service_reports';
import { userLocalUIDState } from '@states/settings';
import { FormS4Props } from '../index.types';
import { delegatedFieldServiceReportsState } from '@states/delegated_field_service_reports';
import { monthNamesState } from '@states/app';
import { UserFieldServiceMonthlyReportType } from '@definition/user_field_service_reports';
import { userFieldServiceMonthlyReportSchema } from '@services/dexie/schema';
import { dbUserFieldServiceReportsSave } from '@services/dexie/user_field_service_reports';
import { dbDelegatedFieldServiceReportsSave } from '@services/dexie/delegated_field_service_reports';

const useMinistryShared = ({ month, person_uid, publisher }: FormS4Props) => {
  const userReports = useRecoilValue(userFieldServiceMonthlyReportsState);
  const delegatedReports = useRecoilValue(delegatedFieldServiceReportsState);
  const congReports = useRecoilValue(congFieldServiceReportsState);
  const userUID = useRecoilValue(userLocalUIDState);
  const monthNames = useRecoilValue(monthNamesState);

  const congReport = useMemo(() => {
    return congReports.find(
      (record) =>
        record.report_data.report_date === month &&
        record.report_data.person_uid === person_uid
    );
  }, [congReports, month, person_uid]);

  const userReport = useMemo(() => {
    return userReports.find((record) => record.report_date === month);
  }, [userReports, month]);

  const delegatedReport = useMemo(() => {
    return delegatedReports.find(
      (record) =>
        record.report_date === month &&
        record.report_data.person_uid === person_uid
    );
  }, [delegatedReports, month, person_uid]);

  const month_name = useMemo(() => {
    if (!publisher) return;

    const monthIndex = +month.split('/')[1] - 1;

    return monthNames.at(monthIndex);
  }, [monthNames, month, publisher]);

  const shared_ministry = useMemo(() => {
    if (congReport) {
      return congReport.report_data.shared_ministry;
    }

    if (userUID === person_uid) {
      if (!userReport) return false;

      return userReport.report_data.shared_ministry;
    }

    if (!delegatedReport) return false;

    return delegatedReport.report_data.shared_ministry;
  }, [congReport, userReport, person_uid, userUID, delegatedReport]);

  const status = useMemo(() => {
    if (congReport) {
      return congReport.report_data.status;
    }

    if (userUID === person_uid) {
      if (!userReport) return 'pending';

      return userReport.report_data.status;
    }

    if (!delegatedReport) return 'pending';

    return delegatedReport.report_data.status;
  }, [congReport, userReport, person_uid, userUID, delegatedReport]);

  const [checked, setChecked] = useState(shared_ministry);

  const readOnly = useMemo(() => {
    const findReport = congReports.find(
      (record) =>
        record.report_data.report_date === month &&
        record.report_data.person_uid === person_uid
    );

    return findReport ? true : false;
  }, [congReports, month, person_uid]);

  const handleToggleChecked = async (value: boolean) => {
    if (status !== 'pending') return;

    try {
      if (publisher) {
        const monthReport =
          userUID === person_uid ? userReport : delegatedReport;

        let report: UserFieldServiceMonthlyReportType;

        if (!monthReport) {
          report = structuredClone(userFieldServiceMonthlyReportSchema);
          report.report_date = month;

          if (userUID !== person_uid) {
            report.report_data.person_uid = person_uid;
          }
        }

        if (monthReport) {
          report = structuredClone(monthReport);
        }

        report.report_data.shared_ministry = value;
        report.report_data.updatedAt = new Date().toISOString();

        if (userUID === person_uid) {
          await dbUserFieldServiceReportsSave(report);
        }

        if (userUID !== person_uid) {
          await dbDelegatedFieldServiceReportsSave(report);
        }
      }
    } catch (error) {
      await displaySnackNotification({
        header: getMessageByCode('error_app_generic-title'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    setChecked(shared_ministry);
  }, [shared_ministry]);

  return { checked, handleToggleChecked, status, readOnly, month_name };
};

export default useMinistryShared;
