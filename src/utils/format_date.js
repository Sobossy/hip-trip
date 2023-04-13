import dayjs from "dayjs";

export function formatMonthDay(date) {
  return dayjs(date).format('MM月DD日')
}
export function nextDate(date) {
  return dayjs(date).add(1, 'day').format('MM月DD日')
}
export function diffDate(startDay, endDay) {
  return dayjs(endDay).diff(startDay, 'day')
}
