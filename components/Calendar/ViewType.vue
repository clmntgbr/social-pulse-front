<script lang="ts" setup>
import { items, type Views } from "../../types/calendar";

const calendarTypeViewCookie = useCookie<Views>("CalendarTypeView");
if (!calendarTypeViewCookie.value) {
  calendarTypeViewCookie.value = items[2];
}

function onChange(index: number) {
  const item = items[index];
  calendarTypeViewCookie.value = item;
}
</script>

<template>
  <UTabs
    v-model="calendarTypeViewCookie.index"
    :items="items"
    class="w-[350px]"
    @change="onChange"
    :content="false"
  />
</template>
