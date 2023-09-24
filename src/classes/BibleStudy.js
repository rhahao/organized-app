import appDb from '../indexedDb/mainDb';
import { BibleStudies } from './BibleStudies';

export class BibleStudyClass {
  constructor() {
    this.uid = window.crypto.randomUUID();
    this.person_name = '';
    this.isDeleted = false;
  }
}

BibleStudyClass.prototype.compare = function (data) {
  const excludeFields = ['isDeleted', 'uid'];

  for (const [key, value] of Object.entries(this)) {
    if (excludeFields.indexOf(key) === -1) {
      if (value !== data[key]) {
        this.changes = this.changes.filter((record) => record.field !== key);
        this.changes.push({ date: new Date(), field: key, value: data[key] });
      }
    }
  }
};

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
