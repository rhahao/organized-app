import { appDb } from '@services/dexie';
import { savePerson } from '@services/dexie/persons';
import { currentReportMonth } from '@services/cpe/serviceYear';
import { setRootModalOpen } from '@services/recoil/app';
import { generateDisplayName } from '@utils/common';
import { computeYearsDiff } from '@utils/date';

const getRandomDate = (startDate, endDate) => {
  startDate = startDate ? new Date(startDate) : new Date(1970, 0, 1);
  endDate = endDate ? new Date(endDate) : new Date(2010, 11, 31);

  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return new Date(timestamp);
};

export const importDummyUsers = async () => {
  await setRootModalOpen(true);

  await appDb.persons.clear();

  const url = 'https://dummyjson.com/users?limit=100';

  const res = await fetch(url);
  const data = await res.json();

  const currentMonthReportStr = currentReportMonth();
  const currentMonthReportDate = new Date(currentMonthReportStr).toISOString();

  let formattedData = data.users.map((user) => {
    const fullname = `${user.lastName} ${user.firstName}`;

    const assignments = [];
    let spiritualStatus = [];
    let isBaptized = false;
    let immersedDate = null;
    let firstMonthReport = null;
    const birthDate = getRandomDate(undefined, new Date(2006, 11, 31));

    if (user.gender === 'female') {
      [101, 102, 103].forEach((code) => {
        assignments.push({ code });
      });

      const arrayType = ['publisher', 'non-publisher', 'baptized'];
      const status = arrayType[Math.floor(Math.random() * arrayType.length)];

      if (status === 'publisher') {
        const publisherStartDate = new Date(new Date(birthDate).setFullYear(new Date(birthDate).getFullYear() + 9));
        const pubStartDate = getRandomDate(publisherStartDate).toISOString();
        spiritualStatus = [
          { statusId: window.crypto.randomUUID(), status: 'publisher', startDate: pubStartDate, endDate: null },
        ];
        firstMonthReport = currentMonthReportDate;
      }

      if (status === 'baptized') {
        const baptismStartDate = new Date(new Date(birthDate).setFullYear(new Date(birthDate).getFullYear() + 11));
        isBaptized = true;
        immersedDate = getRandomDate(baptismStartDate).toISOString();

        const pubStartDate = getRandomDate(birthDate, baptismStartDate).toISOString();
        spiritualStatus = [
          { statusId: window.crypto.randomUUID(), status: 'publisher', startDate: pubStartDate, endDate: null },
        ];
        firstMonthReport = currentMonthReportDate;
      }
    }

    return {
      isDisqualified: false,
      isFemale: user.gender === 'female',
      isMale: user.gender === 'male',
      isMoved: false,
      person_displayName: generateDisplayName(fullname),
      person_name: fullname,
      timeAway: [],
      assignments,
      address: `${user.address.address} ${user.address.city}`,
      email: user.email,
      phone: user.phone,
      birthDate: birthDate.toISOString(),
      spiritualStatus,
      isBaptized,
      immersedDate,
      firstMonthReport,
    };
  });

  const cnChairman = 8;
  for (let i = 0; i < cnChairman; i++) {
    let isPassed = false;
    let user;
    let random;

    do {
      random = Math.floor(Math.random() * formattedData.length);
      user = formattedData[random];
      const age = computeYearsDiff(user.birthDate);

      if (user.isMale && user.assignments.length === 0 && age >= 24) {
        isPassed = true;
      }
    } while (isPassed === false);

    [110, 111, 112, 113, 114, 115, 118, 119, 120].forEach((code) => {
      user.assignments.push({ code });
    });

    const elderStartDate = new Date(
      new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 24)
    ).toISOString();

    user.spiritualStatus = [
      { statusId: window.crypto.randomUUID(), status: 'elder', startDate: elderStartDate, endDate: null },
    ];

    const baptismStartDate = new Date(new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 9));
    const baptismEndDate = new Date(new Date(elderStartDate).setFullYear(new Date(elderStartDate).getFullYear() - 3));

    user.isBaptized = true;
    user.immersedDate = getRandomDate(baptismStartDate, baptismEndDate).toISOString();
    user.firstMonthReport = currentMonthReportDate;

    formattedData.splice(random, 1, user);
  }

  const cnBro = 11;
  for (let i = 0; i < cnBro; i++) {
    let isPassed = false;
    let user;
    let random;

    do {
      random = Math.floor(Math.random() * formattedData.length);
      user = formattedData[random];
      const age = computeYearsDiff(user.birthDate);

      if (user.isMale && user.assignments.length === 0 && age >= 18) {
        isPassed = true;
      }
    } while (isPassed === false);

    [111, 112, 113, 114, 118, 119].forEach((code) => {
      user.assignments.push({ code });
    });

    const assignmentAdd = [120, 121, undefined];
    const selected = assignmentAdd[Math.floor(Math.random() * assignmentAdd.length)];

    if (!selected) {
      user.assignments.push({ selected });
    }

    const msStartDate = new Date(
      new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 17)
    ).toISOString();

    user.spiritualStatus = [
      { statusId: window.crypto.randomUUID(), status: 'ms', startDate: msStartDate, endDate: null },
    ];

    const baptismStartDate = new Date(new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 9));
    const baptismEndDate = new Date(new Date(msStartDate).setFullYear(new Date(msStartDate).getFullYear() - 3));

    user.isBaptized = true;
    user.immersedDate = getRandomDate(baptismStartDate, baptismEndDate).toISOString();
    user.firstMonthReport = currentMonthReportDate;

    formattedData.splice(random, 1, user);
  }

  const cnReader = 6;
  for (let i = 0; i < cnReader; i++) {
    let isPassed = false;
    let user;
    let random;

    do {
      random = Math.floor(Math.random() * formattedData.length);
      user = formattedData[random];
      const age = computeYearsDiff(user.birthDate);

      if (user.isMale && user.assignments.length === 0 && age >= 14) {
        isPassed = true;
      }
    } while (isPassed === false);

    [104, 111, 116].forEach((code) => {
      user.assignments.push({ code });
    });

    const baptismStartDate = new Date(
      new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 11)
    );
    user.isBaptized = true;
    user.immersedDate = getRandomDate(baptismStartDate).toISOString();
    user.firstMonthReport = currentMonthReportDate;

    const pubStartDate = getRandomDate(user.birthDate, baptismStartDate).toISOString();
    user.spiritualStatus = [
      { statusId: window.crypto.randomUUID(), status: 'publisher', startDate: pubStartDate, endDate: null },
    ];

    formattedData.splice(random, 1, user);
  }

  const cnRemains = formattedData.filter((user) => user.isMale && user.assignments.length === 0).length;
  for (let i = 0; i < cnRemains; i++) {
    let isMale = false;
    let user;
    let random;

    do {
      random = Math.floor(Math.random() * formattedData.length);
      user = formattedData[random];

      if (user.isMale && user.assignments.length === 0) {
        isMale = true;
      }
    } while (isMale === false);

    [100, 104, 122].forEach((code) => {
      user.assignments.push({ code });
    });

    const arrayType = ['publisher', 'non-publisher', 'baptized'];
    const status = arrayType[Math.floor(Math.random() * arrayType.length)];

    if (status === 'publisher') {
      const publisherStartDate = new Date(
        new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 9)
      );
      const pubStartDate = getRandomDate(publisherStartDate).toISOString();
      user.spiritualStatus = [
        { statusId: window.crypto.randomUUID(), status: 'publisher', startDate: pubStartDate, endDate: null },
      ];
      user.firstMonthReport = currentMonthReportDate;
    }

    if (status === 'baptized') {
      const baptismStartDate = new Date(
        new Date(user.birthDate).setFullYear(new Date(user.birthDate).getFullYear() + 11)
      );
      user.isBaptized = true;
      user.immersedDate = getRandomDate(baptismStartDate).toISOString();
      user.firstMonthReport = currentMonthReportDate;

      const pubStartDate = getRandomDate(user.birthDate, baptismStartDate).toISOString();
      user.spiritualStatus = [
        { statusId: window.crypto.randomUUID(), status: 'publisher', startDate: pubStartDate, endDate: null },
      ];
    }

    formattedData.splice(random, 1, user);
  }

  for await (const user of formattedData) {
    await savePerson(user);
  }

  await setRootModalOpen(false);
};
