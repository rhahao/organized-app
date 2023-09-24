import appDb from '../indexedDb/mainDb';
import { BibleStudyClass } from './BibleStudy';

class BibleStudiesClass {
  constructor() {
    this.list = [];
  }
}

BibleStudiesClass.prototype.sort = function () {
  this.list.sort((a, b) => {
    return a.person_name > b.person_name ? 1 : -1;
  });
};

BibleStudiesClass.prototype.loadAll = async function () {
  this.list.length = 0;
  const allData = await appDb.user_bible_studies.toArray();

  const appData = allData.filter((record) => record.isDeleted !== true);

  for (const person of appData) {
    const BibleStudy = new BibleStudyClass();
    BibleStudy.uid = person.uid;
    BibleStudy.person_name = person.person_name;
    this.list.push(BibleStudy);
  }

  this.sort();
};

BibleStudiesClass.prototype.get = function (uid) {
  return this.list.find((record) => record.uid === uid);
};

BibleStudiesClass.prototype.getByName = function (person_name) {
  return this.list.find((record) => record.person_name === person_name);
};

BibleStudiesClass.prototype.create = async function (person_name) {
  const BibleStudy = new BibleStudyClass();
  BibleStudy.person_name = person_name;
  await appDb.user_bible_studies.put({ ...BibleStudy }, BibleStudy.uid);

  this.list.push(BibleStudy);
  this.sort();

  return this.list;
};

BibleStudiesClass.prototype.delete = async function (uid) {
  const currentBS = BibleStudies.get(uid);
  await currentBS.delete();

  this.list = this.list.filter((record) => record.uid !== uid);

  return this.list;
};

BibleStudiesClass.prototype.cleanDeleted = async function () {
  const allData = await appDb.user_bible_studies.toArray();
  const appData = allData.filter((record) => record.isDeleted === true);

  for await (const record of appData) {
    await appDb.user_bible_studies.delete(record.uid);
  }
};

export const BibleStudies = new BibleStudiesClass();
