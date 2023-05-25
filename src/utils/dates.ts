export function getHourAndMinute(date: Date) : string {
  const hour = date.getHours();
  const minute = date.getMinutes();
  let minuteStr = minute.toString();
  if (minute < 10) {
    minuteStr = '0' + minute.toString();
  }

  return hour + ':' + minuteStr;
}
