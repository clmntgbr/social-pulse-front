<script lang="ts" setup>
import type { SocialAccount } from "~/composables/api/client/interface/GetPost";
import { SOCIAL_ACCOUNTS_TYPE } from "~/enums/SOCIAL_ACCOUNTS_TYPE";

const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount"
);

if (!selectedCreationPostSocialAccount.value) {
  navigateTo("/posts/create?step=one");
}

watch(
  () => selectedCreationPostSocialAccount.value,
  (newValue) => {
    if (newValue === undefined) {
      navigateTo("/posts/create?step=one");
    }
  }
);
</script>

<template>
  <div class="flex" style="height: calc(100vh - var(--header-height))">
    <div class="w-1/2 bg-slate-100 overflow-y-auto p-4">
      <PostsCreateViewTwitter
        v-if="
          selectedCreationPostSocialAccount?.socialAccountType ===
          SOCIAL_ACCOUNTS_TYPE.TWITTER
        "
      />
    </div>

    <div class="w-1/2 p-4">
      <PostsCreateEditorTwitter
        v-if="
          selectedCreationPostSocialAccount?.socialAccountType ===
          SOCIAL_ACCOUNTS_TYPE.TWITTER
        "
      />
    </div>
  </div>
</template>

<style></style>
