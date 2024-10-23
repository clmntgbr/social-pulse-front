<script setup lang="ts">
import type { Post } from "~/composables/api/client/interface/GetPost";

const props = defineProps<{
  post: Post;
}>();

const { post } = props;
</script>

<template>
  <div class="mt-4">
    <div v-if="post?.pictures.length === 1" class="single-photo h-full">
      <img
        :src="post?.pictures[0] ?? ''"
        alt="Photo 1"
        class="w-full h-full object-cover"
      />
    </div>
    <div v-else-if="post?.pictures.length === 2" class="grid grid-cols-2 gap-1">
      <img
        v-for="(photo, index) in post?.pictures"
        :key="index"
        :src="photo ?? ''"
        :alt="'Photo ' + (index + 1)"
        class="w-full max-h-40 h-full object-cover"
      />
    </div>
    <div
      v-else-if="post?.pictures.length === 3"
      class="grid grid-rows-2 grid-cols-2 gap-1"
    >
      <img
        :src="post?.pictures[0] ?? ''"
        alt="Photo 1"
        class="row-span-2 w-full h-[324px] object-cover"
      />
      <img
        v-for="(photo, index) in post?.pictures.slice(1)"
        :key="index"
        :src="photo ?? ''"
        :alt="'Photo ' + (index + 2)"
        class="w-full max-h-40 h-full object-cover"
      />
    </div>
    <div
      v-else-if="post?.pictures.length === 4"
      class="grid grid-cols-2 grid-rows-2 gap-1"
    >
      <img
        v-for="(photo, index) in post?.pictures"
        :key="index"
        :src="photo ?? ''"
        :alt="'Photo ' + (index + 1)"
        class="w-full max-h-40 h-full object-cover"
      />
    </div>
  </div>
</template>
