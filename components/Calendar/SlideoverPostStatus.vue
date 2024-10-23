<script lang="ts" setup>
import type { Post } from "~/composables/api/client/interface/GetPost";
import { postStatusFormatDate } from "~/composables/calendar/calendar";
import { POSTS_STATUS } from "~/enums/POSTS_STATUS";

const props = defineProps<{
  post?: Post | null;
}>();

const { post } = props;
</script>

<template>
  <UAlert
    v-if="post?.status === POSTS_STATUS.PROGRAMMED"
    class="mb-5"
    icon="i-heroicons-command-line"
    color="amber"
    variant="subtle"
    title="Heads up!"
    :description="postStatusFormatDate(post.postAt, POSTS_STATUS.PROGRAMMED)"
  />
  <UAlert
    v-if="post?.status === POSTS_STATUS.FAILED"
    class="mb-5"
    icon="i-heroicons-command-line"
    color="red"
    variant="subtle"
    title="Heads up!"
    :description="postStatusFormatDate(post.postAt, POSTS_STATUS.FAILED)"
  />
  <UAlert
    v-if="post?.status === POSTS_STATUS.POSTED"
    class="mb-5"
    icon="i-heroicons-command-line"
    color="emerald"
    variant="subtle"
    title="Heads up!"
    :description="postStatusFormatDate(post.postAt, POSTS_STATUS.POSTED)"
  />
</template>

<style></style>
