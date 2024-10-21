<script lang="ts" setup>
const props = defineProps<{
  avatarUrl?: string | null;
  username?: string | null;
  logo?: string | null;
  avatarSize?: "md" | "3xs" | "xs" | "sm" | "2xs" | "lg" | "xl" | "2xl" | "3xl";
  logoSize?: "md" | "3xs" | "xs" | "sm" | "2xs" | "lg" | "xl" | "2xl" | "3xl";
}>();

const {
  avatarUrl,
  username,
  logo,
  avatarSize = "md",
  logoSize = "3xs",
} = props;
</script>

<template>
  <UChip
    size="md"
    position="bottom-right"
    inset
    :ui="{ base: 'rounded-full ring-0', background: '' }"
  >
    <UAvatar
      :size="avatarSize"
      :src="avatarUrl ?? 'https://avatar.vercel.sh/personal.png'"
      :alt="username ?? ''"
    />
    <template #content>
      <UAvatar
        :src="logo ?? ''"
        alt="Avatar"
        :size="logoSize"
        :ui="{ rounded: 'rounded-xl' }"
      />
    </template>
  </UChip>
</template>

<style></style>
