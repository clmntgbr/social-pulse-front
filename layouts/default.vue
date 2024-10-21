<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div :class="'page_' + String(router.currentRoute.value.name)">
    <Header />
    <slot />
  </div>
</template>
