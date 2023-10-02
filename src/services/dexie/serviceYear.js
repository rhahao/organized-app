import { addMonths } from '@utils/date';

export const currentReportMonth = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  let month;
  if (currentDate > 20) {
    month = `${currentYear}/${String(currentMonth).padStart(2, '0')}/01`;
  }

  if (currentDate <= 20) {
    const previousMonthDate = addMonths(new Date(), -1);
    month = `${previousMonthDate.getFullYear()}/${String(previousMonthDate.getMonth() + 1).padStart(2, '0')}/01`;
  }

  return month;
};
