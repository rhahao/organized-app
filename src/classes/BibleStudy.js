import appDb from '../indexedDb/mainDb';
import { BibleStudies } from './BibleStudies';
import { UserS4Records } from './UserS4Records';

export class BibleStudyClass {
  constructor() {
    this.uid = window.crypto.randomUUID();
    this.person_name = '';
    this.isDeleted = false;
  }
}

BibleStudyClass.prototype.save = async function (data) {
  this.compare(data);

  await appDb.user_bible_studies.update(this.uid, { ...data, changes: this.changes });
  this.person_name = data.person_name;

  BibleStudies.sort();
};

BibleStudyClass.prototype.delete = async function () {
  this.isDeleted = true;
  await appDb.user_bible_studies.update(this.uid, { ...this });
};

BibleStudyClass.prototype.isActive = function () {
  let isActive = false;

  for (const report of UserS4Records.list) {
    if (Array.isArray(report.bibleStudies)) {
      const findRecord = report.bibleStudies.some((person) => person === this.uid);
      if (findRecord) {
        isActive = true;
        break;
      }
    }
  }

  return isActive;
};
