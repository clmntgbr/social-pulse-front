<script lang="ts" setup>
import type { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";
import { PostsUseState } from "~/composables/api/client/UseState";
import { PostsAction } from "~/composables/api/posts/actions";
import { getPosts } from "~/composables/api/posts/getPosts.js";
import type { PostsType } from "~/composables/api/posts/types";
import { getScrollTime, updateEvents } from "~/composables/calendar/calendar";
import { type Event } from "~/types/calendar";
import { items, type Views } from "../types/calendar";

const { t } = useNuxtApp().$i18n;

const events = useState<Event[]>("events", () => []);
const calendarTypeViewCookie = useCookie<Views>("CalendarTypeView");
if (!calendarTypeViewCookie.value) {
  calendarTypeViewCookie.value = items[2];
}
const calendarRef = ref<typeof FullCalendar | null>(null);
const title = ref<string>("");
const intervalId: { value: ReturnType<typeof setInterval> | null } = {
  value: null,
};

const posts = useState<PostsType>(PostsUseState.GET_POSTS);
await getPosts();

async function updatePosts() {
  await getPosts();
}

const calendarOptions = <CalendarOptions>{
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    multiMonthPlugin,
    listPlugin,
  ],
  headerToolbar: {
    left: "",
    center: "",
    right: "",
  },
  selectable: true,
  height: "100%",
  dayHeaders: true,
  navLinks: true,
  slotDuration: "00:30:00",
  nowIndicator: false,
  scrollTime: getScrollTime(),
  now: new Date(),
  firstDay: 1,
  initialView: calendarTypeViewCookie.value.key,
  displayEventEnd: true,
  nextDayThreshold: "12:00:00",
  locale: "fr",
  buttonIcons: false,
  weekNumbers: true,
  editable: true,
  weekText: "S",
  dayMaxEvents: 5,
  dayHeaderDidMount: function (info) {
    updateDayHeader(info);
  },
  dayHeaderContent: function (args) {
    const originalText = args.text;
    const shortText = originalText.substring(0, 3).toLowerCase();
    return { html: shortText };
  },
  eventDidMount: function (info) {
    // console.log("eventDidMount");
  },
  eventClick: async function (info) {},
  navLinkDayClick: function (date, jsEvent) {
    const calendar = calendarRef.value?.getApi();
    calendar?.changeView("dayGridDay", date);
    calendarTypeViewCookie.value = items[0];
  },
  navLinkWeekClick: function (date, jsEvent) {
    // console.log("navLinkWeekClick");
  },
  dateClick: function (info) {
    // console.log("dateClick");
  },
};

function updateDayHeader(info: any) {
  const view = info.view;

  let date;
  let header;

  switch (view.type) {
    case "dayGridDay":
      date =
        t("calendar.title." + info.text.replace(".", "").substring(0, 3)) +
        " " +
        new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(info.date);
      header = info.el.querySelector(".fc-col-header-cell-cushion");
      break;
    case "listWeek":
      date =
        t("calendar.title." + info.text.replace(".", "").substring(0, 3)) +
        " " +
        new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(info.date);
      header = info.el.querySelector(".fc-list-day-cushion");
      break;
    default:
      date = t("calendar.title." + info.text.replace(".", "").substring(0, 3));
      header = info.el.querySelector(".fc-col-header-cell-cushion");
      break;
  }

  if (header) {
    header.textContent = date;
  }
}

function updateTitle(calendar: any) {
  title.value =
    t(
      "calendar.month." +
        calendar.currentData.dateProfile.currentDate.toLocaleDateString(
          "en-US",
          {
            month: "2-digit",
          }
        )
    ) +
    " " +
    calendar.currentData.dateProfile.currentDate.toLocaleDateString("en-US", {
      year: "numeric",
    });
}

function goToPrevious() {
  const calendar = calendarRef?.value?.getApi();
  calendar.prev();
  updateTitle(calendar);
}

function goToNext() {
  const calendar = calendarRef?.value?.getApi();
  calendar.next();
  updateTitle(calendar);
}

onMounted(async () => {
  await updatePosts();
  if (posts.value.type === PostsAction.GET_POSTS_SUCCESS) {
    updateEvents(events, posts.value.payload);
  }
  const calendar = calendarRef?.value?.getApi();
  updateTitle(calendar);
  intervalId.value = setInterval(updatePosts, 10000);
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

function goToToday() {
  const calendar = calendarRef?.value?.getApi();
  calendar.today();
  updateTitle(calendar);
}

watch(
  () => calendarTypeViewCookie.value,
  async (calendarTypeView) => {
    const calendar = calendarRef.value?.getApi();
    calendar?.changeView(calendarTypeView.key);
  }
);

watch(
  () => posts.value,
  (newValue) => {
    if (newValue.type === PostsAction.GET_POSTS_SUCCESS) {
      updateEvents(events, newValue.payload);
    }
  },
  { immediate: true }
);

watch(
  events,
  () => {
    const calendar = calendarRef.value?.getApi();
    calendar.removeAllEventSources();
    calendar.addEventSource(events.value);
  },
  { deep: true }
);

const nuxtApp = useNuxtApp();
nuxtApp.hook("app:mounted", () => {
  if (posts.value.type === PostsAction.GET_POSTS_SUCCESS) {
    updateEvents(events, posts.value.payload);
  }
});
</script>

<template>
  <div class="h-screen" style="height: calc(100vh - 4rem)">
    <div class="flex flex-col h-full">
      <div class="flex justify-between items-center p-3">
        <div class="flex-1">
          <UButton color="green" variant="soft" size="md">
            {{ title }}
          </UButton>
        </div>
        <div class="flex justify-center">
          <UButton
            icon="i-heroicons-arrow-left"
            size="md"
            color="green"
            variant="soft"
            @click="goToPrevious"
          >
          </UButton>
          <UButton color="green" variant="soft" size="md" @click="goToToday">
            Today
          </UButton>
          <UButton
            icon="i-heroicons-arrow-right"
            size="md"
            color="green"
            variant="soft"
            @click="goToNext"
          >
          </UButton>
        </div>
        <div class="flex justify-end flex-1">
          <CalendarViewType />
        </div>
      </div>
      <div class="flex-1">
        <div class="bg-white h-full">
          <FullCalendar :options="calendarOptions" ref="calendarRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fc-header-toolbar {
  display: none !important;
}

.fc-day-today {
  background-color: #a5a4a428 !important;
}

.fc-daygrid-event-harness a {
  border: 1px #dddddd80 solid;
  margin-bottom: 2px;
}
</style>
