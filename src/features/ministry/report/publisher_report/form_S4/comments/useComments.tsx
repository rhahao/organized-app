import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userFieldServiceMonthlyReportsState } from '@states/user_field_service_reports';
import { UserFieldServiceMonthlyReportType } from '@definition/user_field_service_reports';
import { userFieldServiceMonthlyReportSchema } from '@services/dexie/schema';
import { debounceUserFieldServiceSave } from '@services/app/user_field_service_reports';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { congFieldServiceReportsState } from '@states/field_service_reports';
import { userLocalUIDState } from '@states/settings';
import { FormS4Props } from '../index.types';
import { delegatedFieldServiceReportsState } from '@states/delegated_field_service_reports';
import { debounceDelegatedFieldServiceSave } from '@services/app/delegated_field_service_reports';

const useComments = ({ month, person_uid, publisher }: FormS4Props) => {
  const userReports = useRecoilValue(userFieldServiceMonthlyReportsState);
  const delegatedReports = useRecoilValue(delegatedFieldServiceReportsState);
  const congReports = useRecoilValue(congFieldServiceReportsState);
  const userUID = useRecoilValue(userLocalUIDState);

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

  const comments = useMemo(() => {
    if (congReport) {
      return congReport.report_data.comments;
    }

    if (userUID === person_uid) {
      if (!userReport) return '';

      return userReport.report_data.comments;
    }

    if (!delegatedReport) return '';

    return delegatedReport.report_data.comments;
  }, [congReport, userReport, person_uid, userUID, delegatedReport]);

  const [value, setValue] = useState(comments);

  const readOnly = useMemo(() => {
    const findReport = congReports.find(
      (record) =>
        record.report_data.report_date === month &&
        record.report_data.person_uid === person_uid
    );

    return findReport ? true : false;
  }, [congReports, month, person_uid]);

  const handleCommentsChange = async (value: string) => {
    if (status !== 'pending') return;

    setValue(value);

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

        report.report_data.comments = value;
        report.report_data.updatedAt = new Date().toISOString();

        if (userUID === person_uid) {
          debounceUserFieldServiceSave(report);
        }

        if (userUID !== person_uid) {
          debounceDelegatedFieldServiceSave(report);
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
    setValue(comments);
  }, [comments]);

  return { value, handleCommentsChange, status, readOnly };
};

export default useComments;
