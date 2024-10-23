export function twitterPostFormatDate(postAt: any): string {
  const { locale } = useI18n();
  const date = convertStringToDate(postAt, locale.value);

  const dayName = date.toFormat("cccc");
  const monthName = date.toFormat("LLLL");
  const day = date.toFormat("d");
  const time = date.toFormat("HH:mm");

  const message = "%time% · %dayName% %day% %monthName%";

  return message
    .replace("%dayName%", capitalizeFirstLetter(dayName))
    .replace("%monthName%", capitalizeFirstLetter(monthName))
    .replace("%day%", day)
    .replace("%time%", time);
}
