import { addHours } from 'date-fns';

export const convertDatetimeIsoString = (isoString: string, hoursToAdd = 3) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const adjustedDate = addHours(date, hoursToAdd);
  return adjustedDate.toISOString();
};
