import { DateTime } from "luxon";

export function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertStringToDate(
  date: string | null,
  locale: string
): DateTime {
  if (date === null) {
    return DateTime.now();
  }

  return DateTime.fromISO(date).setLocale(locale);
}
