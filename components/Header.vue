<template>
  <div
    class="header h-[--header-height] flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 min-w-0 relative z-50"
  >
    <div class="gap-4 hidden md:flex">
      <HeaderWorkspaces />
      <NuxtLink to="/social_accounts">
        <HeaderSocialAccounts />
      </NuxtLink>
    </div>

    <div class="absolute left-1/2 transform -translate-x-1/2 text-center z-50">
      <div class="flex-2 flex items-center justify-center">
        <HeaderMenu class="mx-6 m-auto" />
      </div>
    </div>

    <div class="hidden lg:flex items-center space-x-2 ml-auto z-50">
      <UChip>
        <UButton icon="i-heroicons-inbox" color="gray" />
      </UChip>
    </div>
  </div>
</template>
