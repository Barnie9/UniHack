import format from "date-fns/format";

export function formatAPIDate(date: string, dateFormat?: string) {
  if (date) {
    if (date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}\+\d{2}:\d{2}$/))
      return date;

    if (date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/))
      date = date.replace(/.000Z/g, "+0000").replace(/T/g, " ");

    const splitDate = date.split(" ");

    const newDate = splitDate[0]
      .split("-")
      .concat(splitDate[1].replace(/\+0000/g, "").split(":"))
      .map((item) => parseInt(item, 10));

    // Months start from 0
    newDate[1] -= 1;

    const formattedDate = new Date(
      ...(newDate as [number, number, number, number, number, number])
    );

    const isCorrectTimeZone = splitDate[1].split("+")[1] !== "0000";

    const timeZoneAdjustedDate = isCorrectTimeZone
      ? formattedDate
      : new Date(
          formattedDate.getTime() - new Date().getTimezoneOffset() * 60000
        );

    if (dateFormat) return format(timeZoneAdjustedDate, dateFormat);

    return timeZoneAdjustedDate;
  } else return date;
}

export function formatExtendedNotion(date: string) {
  if (date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+0$/)) {
    date = date.replace(/\+0/g, "+0000");
    date = date.replace(/ /g, "T");
  }

  return date;
}

export function roundMinutes(date: Date, roundToNextHour?: boolean) {
  const toNextHour = roundToNextHour && date.getMinutes() < 30;

  date.setHours(
    date.getHours() + (toNextHour ? 1 : Math.round(date.getMinutes() / 60))
  );
  date.setMinutes(0, 0, 0);

  return date;
}
