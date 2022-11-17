export const getNextStartWeek = () => {

  const fridayNumber = 5;
  const hoursNumber = 20;

  const now = new Date();
  const dayOfTheWeek = now.getDay();

  let dayOffset = fridayNumber - dayOfTheWeek;

  if (dayOffset < 0 || (dayOffset === 0 && now.getHours() > hoursNumber))
    dayOffset += 7;

  let result = new Date();

  result.setDate(result.getDate() + dayOffset);
  result.setHours(hoursNumber);
  result.setMinutes(0);
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;

}

export const formatDate = (date: Date) => {

  const dayFormated = date.getDate().toString().padStart(2, '0');
  const monthFormated = String(date.getMonth() + 1).padStart(2, '0');
  const yearFormated = date.getFullYear();

  const formatedDate = `${yearFormated}-${monthFormated}-${dayFormated}`;

  return formatedDate;

};