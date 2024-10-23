<script lang="ts" setup>
import { POSTS_CREATE_STEPS } from "~/enums/POSTS_CREATE_STEPS";

const route = useRoute();
const step = computed(() => route.query.step || POSTS_CREATE_STEPS.ONE);
</script>

<template>
  <PostsCreateStepOne v-if="step === POSTS_CREATE_STEPS.ONE" />
  <PostsCreateStepTwo v-if="step === POSTS_CREATE_STEPS.TWO" />
  <PostsCreateStepThree v-if="step === POSTS_CREATE_STEPS.THREE" />
</template>

<style></style>
