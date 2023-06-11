import moment from "moment";


export const getUnixTimestampsForToday = (): [number, number] => {
  const today = moment().startOf("day");
  const startOfDay = today.unix();
  const endOfDay = today.endOf("day").unix();
  return [startOfDay, endOfDay];
};
export const getUnixTimestampsForThisWeek = (): [number, number] => {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  const startOfWeekUnix = startOfWeek.unix();
  const endOfWeekUnix = endOfWeek.unix();
  return [startOfWeekUnix, endOfWeekUnix];
};
export const getUnixTimestampsForWeekend = (): [number, number] => {
  const startOfWeekend = moment().startOf('week').add(5, 'days');
  const endOfWeekend = moment().startOf('week').add(6, 'days').endOf('day');
  const startOfWeekendUnix = startOfWeekend.unix();
  const endOfWeekendUnix = endOfWeekend.unix();
  return [startOfWeekendUnix, endOfWeekendUnix];
};