import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAppTranslation } from '@hooks/index';
import { FormS4Props } from '../index.types';
import { congFieldServiceReportsState } from '@states/field_service_reports';
import { userFieldServiceMonthlyReportSchema } from '@services/dexie/schema';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { userFieldServiceMonthlyReportsState } from '@states/user_field_service_reports';
import { delegatedFieldServiceReportsState } from '@states/delegated_field_service_reports';
import { userLocalUIDState } from '@states/settings';
import { dbUserFieldServiceReportsSave } from '@services/dexie/user_field_service_reports';
import { dbDelegatedFieldServiceReportsSave } from '@services/dexie/delegated_field_service_reports';
import { UserFieldServiceMonthlyReportType } from '@definition/user_field_service_reports';
import { userBibleStudiesState } from '@states/user_bible_studies';
import { UserBibleStudyType } from '@definition/user_bible_studies';

const useBibleStudies = ({ month, person_uid, publisher }: FormS4Props) => {
  const { t } = useAppTranslation();

  const bibleStudyRef = useRef<Element>(null);

  const userReports = useRecoilValue(userFieldServiceMonthlyReportsState);
  const delegatedReports = useRecoilValue(delegatedFieldServiceReportsState);
  const congReports = useRecoilValue(congFieldServiceReportsState);
  const userUID = useRecoilValue(userLocalUIDState);
  const bibleStudiesRecords = useRecoilValue(userBibleStudiesState);

  const isSelf = useMemo(() => userUID === person_uid, [userUID, person_uid]);

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

    if (isSelf) {
      if (!userReport) return 'pending';

      return userReport.report_data.status;
    }

    if (!delegatedReport) return 'pending';

    return delegatedReport.report_data.status;
  }, [congReport, userReport, isSelf, delegatedReport]);

  const bible_studies = useMemo(() => {
    if (congReport) {
      return congReport.report_data.bible_studies;
    }

    if (isSelf) {
      if (!userReport) return 0;

      if (typeof userReport.report_data.bible_studies === 'number') {
        return userReport.report_data.bible_studies as number;
      }

      const recordsCount = userReport.report_data.bible_studies.records.length;
      let totalCount =
        userReport.report_data.bible_studies.daily +
        userReport.report_data.bible_studies.monthly;

      if (totalCount < 0) totalCount = 0;

      return totalCount < recordsCount ? recordsCount : totalCount;
    }

    if (!delegatedReport) return 0;

    if (typeof delegatedReport.report_data.bible_studies === 'number') {
      return delegatedReport.report_data.bible_studies as number;
    }

    const recordsCount =
      delegatedReport.report_data.bible_studies.records.length;
    const totalCount =
      delegatedReport.report_data.bible_studies.daily +
      delegatedReport.report_data.bible_studies.monthly;

    return totalCount < recordsCount ? recordsCount : totalCount;
  }, [congReport, userReport, isSelf, delegatedReport]);

  const bible_studies_records = useMemo(() => {
    if (!isSelf) return;

    if (!userReport) return [];

    if (typeof userReport.report_data.bible_studies === 'number') return [];

    const records = userReport.report_data.bible_studies?.records || [];

    const result = records.map((record) => {
      const found = bibleStudiesRecords.find((b) => b.person_uid === record);

      return (
        found || {
          person_uid: record,
          person_data: { person_name: '   ', _deleted: false, updatedAt: '' },
        }
      );
    });

    return result;
  }, [userReport, isSelf, bibleStudiesRecords]);

  const readOnly = useMemo(() => {
    const findReport = congReports.find(
      (record) =>
        record.report_data.report_date === month &&
        record.report_data.person_uid === person_uid
    );

    return findReport ? true : false;
  }, [congReports, month, person_uid]);

  const [value, setValue] = useState(bible_studies);

  const handleCheckSelected = (study: UserBibleStudyType) => {
    return bible_studies_records.some(
      (record) => record.person_uid === study.person_uid
    );
  };

  const handleBibleStudyRecordsChange = async (study: UserBibleStudyType) => {
    if (status !== 'pending') return;

    try {
      let report: UserFieldServiceMonthlyReportType;

      if (!userReport) {
        report = structuredClone(userFieldServiceMonthlyReportSchema);
        report.report_date = month;
        report.report_data.bible_studies.records = [];
      }

      if (userReport) {
        report = structuredClone(userReport);
      }

      if (typeof report.report_data.bible_studies === 'number') {
        report.report_data.bible_studies = {
          daily: report.report_data.bible_studies,
          monthly: 0,
          records: [],
        };
      }

      const findStudy = report.report_data.bible_studies.records.some(
        (record) => record === study.person_uid
      );

      if (!findStudy) {
        report.report_data.bible_studies.records.push(study.person_uid);
      }

      report.report_data.bible_studies.monthly++;

      if (report.report_data.bible_studies.monthly > 0) {
        report.report_data.shared_ministry = true;
      }

      report.report_data.updatedAt = new Date().toISOString();

      await dbUserFieldServiceReportsSave(report);
    } catch (error) {
      await displaySnackNotification({
        header: getMessageByCode('error_app_generic-title'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  const handleBibleStudyChange = async (value: number) => {
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

        report.report_data.bible_studies.monthly = value;

        if (value > 0) {
          report.report_data.shared_ministry = true;
        }

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

  const handleBibleStudyDelete = async (study: UserBibleStudyType) => {
    if (status !== 'pending') return;

    try {
      const report = structuredClone(userReport);

      report.report_data.bible_studies.records =
        report.report_data.bible_studies.records.filter(
          (record) => record !== study.person_uid
        );

      report.report_data.bible_studies.monthly--;
      report.report_data.updatedAt = new Date().toISOString();

      await dbUserFieldServiceReportsSave(report);
    } catch (error) {
      await displaySnackNotification({
        header: getMessageByCode('error_app_generic-title'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  const bibleStudiesValidator = async (value: number) => {
    if (!userReport) return true;

    const records = userReport.report_data.bible_studies.records?.length || 0;

    if (value < records) {
      await displaySnackNotification({
        header: t('tr_cantDeductStudiesTitle'),
        message: t('tr_cantDeductStudiesDesc'),
        severity: 'error',
      });

      return false;
    }

    const daily = userReport.report_data.bible_studies?.daily || 0;

    return true;
  };

  useEffect(() => {
    setValue(bible_studies);
  }, [bible_studies]);

  return {
    value,
    handleBibleStudyChange,
    readOnly,
    bibleStudyRef,
    isSelf,
    handleBibleStudyRecordsChange,
    handleCheckSelected,
    bible_studies_records,
    handleBibleStudyDelete,
    bibleStudiesValidator,
  };
};

export default useBibleStudies;
