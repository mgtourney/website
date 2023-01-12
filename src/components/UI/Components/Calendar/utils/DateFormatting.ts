import moment from "moment";

export function prettyDate(start: string, end: string | null): String {
  if (!end || start === end) {
    return moment(start).format("ddd, Do MMM, YYYY");
  } else {
    return `${moment(start).format("Do/MMM, YY")} ${moment(end).format(
      "- Do/MMM, YY"
    )}`;
  }
}

export function prettyLongDate(start: string, end: string | null): string {
  if (!end || start === end) {
    return moment(start).format("dddd Do MMMM");
  } else {
    return `${moment(start).format("dddd Do MMMM")}, ${moment(end).format(
      "dddd Do MMMM"
    )}`;
  }
}

export function getMonth(date: string): String {
  return Intl.DateTimeFormat("en", { month: "short" }).format(new Date(date));
}

export function getDay(date: string): String {
  return Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(date));
}

export function getYear(date: string): String {
  return Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(date));
}

export function getDayStr(date: string): String {
  return moment(date).format("ddd");
}
