<script lang="ts" setup>
const navigateToPostsCreate = () => {
  navigateTo("/posts/create?step=one");
};
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg z-50"
  >
    <UButton
      class="px-7 py-3"
      label="Créer un post"
      :hasIcon="true"
      variant="outline"
      icon="i-heroicons-bell-alert"
      :onClick="navigateToPostsCreate"
    />
  </div>
</template>

<style></style>
