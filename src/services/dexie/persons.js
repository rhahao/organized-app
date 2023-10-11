import { promiseGetRecoil } from 'recoil-outside';
import { comparePerson } from '@services/cpe/persons';
import { personsState } from '@states/persons';
import appDb from './db';
import { getServiceYearByMonth } from './serviceYear';
import { addMonths } from '@utils/date';
import { getPublisherS21, isPublisherHasReport } from './fieldServiceReports';

export const resetPersons = async (cong_persons) => {
  await appDb.persons.clear();

  for await (const person of cong_persons) {
    await appDb.persons.put(person);
  }
};

export const savePerson = async (data) => {
  const { person_uid, person_name, person_displayName } = data;

  if (person_name && person_displayName) {
    if (person_uid) {
      const persons = await promiseGetRecoil(personsState);
      const currentPerson = persons.find((person) => person.person_uid === data.person_uid);
      const newPerson = structuredClone(currentPerson);

      if (!data.isMoved) {
        newPerson.changes = comparePerson(newPerson, data);
        newPerson.changes = data.changes.filter((item) => item.field !== 'lastAssignment');
      }

      await appDb.persons.put(newPerson);
    }

    if (!person_uid) {
      const newPerson = {
        person_uid: window.crypto.randomUUID(),
        isMoved: false,
        isDisqualified: false,
        ...data,
      };

      await appDb.persons.put(newPerson);
    }

    return true;
  } else {
    return false;
  }
};

export const deletePerson = async (uid) => {
  const oldPersons = await promiseGetRecoil(personsState);
  const persons = structuredClone(oldPersons);

  const person = persons.find((p) => p.person_uid === uid);

  if (person) {
    person.is_deleted = true;

    await appDb.persons.put(person);
  }
};

export const personIsPublisher = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const publisherDates = person.spiritualStatus?.filter((status) => status.status === 'publisher') || [];

  for (const service of publisherDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsAuxiliaryPioneer = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const auxPionnerDates = person.otherService?.filter((service) => service.service === 'auxiliaryPioneer') || [];

  for (const service of auxPionnerDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsElder = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const elderDates = person.spiritualStatus?.filter((status) => status.status === 'elder') || [];

  for (const service of elderDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsMS = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const msDates = person.spiritualStatus?.filter((status) => status.status === 'ms') || [];

  for (const service of msDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsRegularPioneer = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const regPionnerDates = person.otherService?.filter((service) => service.service === 'regularPioneer') || [];

  for (const service of regPionnerDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsSpecialPioneer = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;
  const specialPioneerDates = person.otherService?.filter((service) => service.service === 'specialPioneer') || [];

  for (const service of specialPioneerDates) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(service.startDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate > varDate) {
      continue;
    }

    if (service.endDate === null) {
      result = true;
      break;
    }

    const endDate = new Date(service.endDate);
    if (varDate < endDate) {
      result = true;
      break;
    }
  }

  return result;
};

export const personIsBaptized = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  if (!month) month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let result = false;

  if (person.isBaptized) {
    const varDate = new Date(month);
    const tmpStartDate = new Date(person.immersedDate);
    const startDate = new Date(tmpStartDate.getFullYear(), tmpStartDate.getMonth(), 1);

    if (startDate <= varDate) {
      result = true;
    }
  }

  return result;
};

export const personIsValidPublisher = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  const currentDate = new Date();
  if (!month) month = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/01`;

  let isValid = true;
  if (person.firstMonthReport !== null) {
    const dateCheck = new Date(month);
    const firstReport = new Date(person.firstMonthReport);
    if (dateCheck < firstReport) isValid = false;
  }

  return isValid;
};

export const personIsActivePublisher = async (uid, month) => {
  const persons = await promiseGetRecoil(personsState);
  const person = persons.find((p) => p.person_uid === uid);

  // default month to current month if undefined
  const currentDate = new Date();
  if (!month) month = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/01`;

  let isActive = false;
  let countReport = 0;
  let SY = await getServiceYearByMonth(month);
  let serviceYear;

  do {
    if (SY) {
      const isValid = await personIsValidPublisher(month);

      if (!isValid) {
        isActive = true;
        break;
      }

      serviceYear = SY.uid;
      const currentS21 = await getPublisherS21(serviceYear, person.person_uid);
      if (currentS21) {
        const hasReport = await isPublisherHasReport({
          service_year: serviceYear,
          person_uid: person.person_uid,
          month,
        });
        if (hasReport) {
          isActive = true;
          break;
        }
      }

      const prevMonth = addMonths(new Date(month), -1);
      month = `${prevMonth.getFullYear()}/${String(prevMonth.getMonth() + 1).padStart(2, '0')}/01`;
      SY = await getServiceYearByMonth(month);
    }

    if (!SY) {
      isActive = true;
      break;
    }

    countReport++;
  } while (countReport <= 5);

  return isActive;
};

export const personsFilter = async (persons, data) => {
  const txtSearch = data.txtSearch || '';
  const filter = data.filter || 'allPersons';

  const month = data.month || `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/01`;

  let firstPassFiltered = [];
  if (filter === 'allPersons') {
    firstPassFiltered = structuredClone(persons);
  }

  const allPublishers = [];
  for await (const person of persons) {
    const isElder = await personIsElder(person.person_uid, month);
    const isMS = await personIsMS(person.person_uid, month);
    const isPublisher = await personIsPublisher(person.person_uid, month);
    const isValid = await personIsValidPublisher(person.person_uid, month);

    if (isValid && (isElder || isMS || isPublisher)) {
      const obj = { ...structuredClone(person), isElder, isMS, isPublisher, isValid };
      allPublishers.push(obj);
    }
  }

  if (filter === 'allPublishers') {
    firstPassFiltered = structuredClone(allPublishers);
  }

  if (filter === 'baptizedPublishers') {
    for await (const person of allPublishers) {
      const isBaptized = await personIsBaptized(person.person_uid, month);

      if (isBaptized && (person.isElder || person.isMS || person.isPublisher)) {
        const obj = { ...person, isBaptized };
        firstPassFiltered.push(obj);
      }
    }
  }

  if (filter === 'unbaptizedPublishers') {
    for (const person of allPublishers) {
      if (!person.isBaptized && person.isPublisher) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'appointedBrothers') {
    for await (const person of allPublishers) {
      if (person.isElder || person.isMS) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'elders') {
    for (const person of allPublishers) {
      if (person.isElder) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'unpostedReports') {
    for await (const person of allPublishers) {
      const isActive = await personIsActivePublisher(person.person_uid, month);
      if (isActive) {
        const hasReport = await isPublisherHasReport({ person_uid: person.person_uid, month });

        if (!hasReport) {
          firstPassFiltered.push(person);
        }
      }
    }
  }

  if (filter === 'auxiliaryPioneers') {
    for await (const person of allPublishers) {
      const isAuxP = await personIsAuxiliaryPioneer(person.person_uid, month);

      if (isAuxP) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'regularPioneers') {
    for await (const person of allPublishers) {
      const isFR = await personIsRegularPioneer(person.person_uid, month);

      if (isFR) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'haveReports') {
    for await (const person of allPublishers) {
      const hasReport = await isPublisherHasReport({ person_uid: person.person_uid, month });

      if (hasReport) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'inactivePublishers') {
    for await (const person of allPublishers) {
      const isActive = await personIsActivePublisher(person.person_uid, month);

      if (!isActive) {
        firstPassFiltered.push(person);
      }
    }
  }

  if (filter === 'activePublishers') {
    for await (const person of allPublishers) {
      const isActive = await personIsActivePublisher(person.person_uid, month);

      if (isActive) {
        firstPassFiltered.push(person);
      }
    }
  }

  const secondPassFiltered = [];
  for (const person of firstPassFiltered) {
    if (person.person_name.toLowerCase().includes(txtSearch.toLowerCase())) {
      secondPassFiltered.push(person);
    }
  }

  secondPassFiltered.sort((a, b) => {
    return a.person_name > b.person_name ? 1 : -1;
  });

  return secondPassFiltered;
};
