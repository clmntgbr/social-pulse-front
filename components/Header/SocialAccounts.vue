<script setup lang="ts">
import { SocialAccountsUseState } from "~/composables/api/client/UseState";
import { SocialAccountsAction } from "~/composables/api/social_accounts/actions";
import { getSocialAccounts } from "~/composables/api/social_accounts/getSocialAccounts";
import type { SocialAccountsType } from "~/composables/api/social_accounts/types";

const socialAccounts = useState<SocialAccountsType>(
  SocialAccountsUseState.GET_SOCIAL_ACCOUNTS
);
await getSocialAccounts();
</script>
<template>
  <div
    class="flex -space-x-2"
    v-if="
      socialAccounts &&
      socialAccounts.type === SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS
    "
  >
    <UAvatarGroup size="md" :max="5">
      <UTooltip
        v-if="socialAccounts.payload"
        v-for="item in socialAccounts.payload.member"
        :key="item.uuid"
        class="border border-gray-200 rounded-full"
      >
        <template #text>
          <span class="italic">{{ item.username }}</span>
        </template>

        <MiscSocialAccountProfile
          :key="item?.uuid"
          :logo="item?.socialAccountTypeAvatarUrl"
          :avatar-url="item?.avatarUrl"
          :username="item?.username"
        />
      </UTooltip>
    </UAvatarGroup>
  </div>
</template>
