import { Locales } from "~/enums/LOCALES";
import { POSTS_STATUS } from "~/enums/POSTS_STATUS";
import { type Event } from "~/types/calendar";
import type { Post } from "../api/client/interface/GetPost";
import type { GetPosts } from "../api/client/interface/GetPosts";

function getOrdinal(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function updateEvents(events: globalThis.Ref<Event[]>, posts: GetPosts) {
  events.value =
    posts?.member.map((post): Event => {
      return {
        title: post.header,
        overlap: false,
        color: getEventColor(post as Post),
        extendedProps: { groupdUuid: post.groupUuid },
        start: post.postAt?.toString() || "",
        end: post.postAt?.toString() || "",
      };
    }) || [];
}

export function postStatusFormatDate(postAt: any, postsStatus: string): string {
  const { locale } = useI18n();
  const date = convertStringToDate(postAt, locale.value);

  const dayName = date.toFormat("cccc");
  const monthName = date.toFormat("LLLL");
  const day = date.toFormat("d");
  const ordinal = getOrdinal(Number(day));
  const time = date.toFormat("HH:mm");

  return postStatusFormatPublicationText(
    locale.value,
    postsStatus,
    dayName,
    monthName,
    day,
    ordinal,
    time
  );
}

function postStatusFormatPublicationText(
  locale: string,
  postsStatus: string,
  dayName: string,
  monthName: string,
  day: string,
  ordinal: string,
  time: string
): string {
  const { t } = useNuxtApp().$i18n;

  switch (locale) {
    case Locales.FR_FR:
      return t("calendar.posts.publication." + postsStatus)
        .replace("dayName", capitalizeFirstLetter(dayName))
        .replace("monthName", capitalizeFirstLetter(monthName))
        .replace("day", day)
        .replace("ordinal", "")
        .replace("time", time);
    case Locales.EN_EN:
    default:
      return t("calendar.posts.publication." + postsStatus)
        .replace("%dayName%", capitalizeFirstLetter(dayName))
        .replace("%monthName%", capitalizeFirstLetter(monthName))
        .replace("%day%", day)
        .replace("%ordinal%", ordinal)
        .replace("%time%", time);
  }
}

function getEventColor(post: Post) {
  switch (post.status) {
    case POSTS_STATUS.DRAFT:
      return "#f44336";
    case POSTS_STATUS.PROGRAMMED:
      return "#fbc02d";
    case POSTS_STATUS.POSTED:
      return "#43a047";
    default:
      return "#A9A9A9";
  }
}

export function getScrollTime() {
  const now = new Date();
  now.setHours(now.getHours() - 1.5);
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}:00`;
}

export function updateDayHeader(info: any) {
  const view = info.view;
  const { t } = useNuxtApp().$i18n;

  let date;

  switch (view.type) {
    case "dayGridDay":
      date =
        t("calendar.title." + info.text.replace(".", "").substring(0, 3)) +
        " " +
        new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(info.date);
      break;
    default:
      date = t("calendar.title." + info.text.replace(".", "").substring(0, 3));
      break;
  }

  const header = info.el.querySelector(".fc-col-header-cell-cushion");
  if (header) {
    header.textContent = date;
  }
}
