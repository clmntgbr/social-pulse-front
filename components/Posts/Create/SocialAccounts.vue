<script setup lang="ts">
import type { SocialAccount } from "~/composables/api/client/interface/GetPost";
import { SocialAccountsAction } from "~/composables/api/social_accounts/actions";
import { getSocialAccounts } from "~/composables/api/social_accounts/getSocialAccounts";

const socialAccounts = await getSocialAccounts();

const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount",
  () => undefined
);

const { t } = useNuxtApp().$i18n;

const route = useRoute();
const router = useRouter();

const updateStep = (newStep: string) => {
  router.push({
    query: {
      ...route.query,
      step: newStep,
    },
  });
};

const submit = () => {
  updateStep("two");
};
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <p class="font-semibold">
      {{ t("posts.create.stepone.title") }}
    </p>
    <USelectMenu
      v-if="
        socialAccounts.type === SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS
      "
      size="xl"
      class="w-full"
      v-model="selectedCreationPostSocialAccount"
      :options="socialAccounts.payload.member"
      option-attribute="username"
    >
      <template #label>
        <MiscSocialAccountProfile
          v-if="selectedCreationPostSocialAccount"
          :key="selectedCreationPostSocialAccount.uuid"
          :avatar-url="selectedCreationPostSocialAccount.avatarUrl ?? ''"
          :logo="
            selectedCreationPostSocialAccount.socialAccountTypeAvatarUrl ?? ''
          "
          :username="selectedCreationPostSocialAccount.username"
          logo-size="2xs"
          avatar-size="xl"
        />
        <span v-if="selectedCreationPostSocialAccount" class="truncate">{{
          selectedCreationPostSocialAccount.username
        }}</span>

        <div
          v-if="!selectedCreationPostSocialAccount"
          class="flex items-center space-x-4"
        >
          <USkeleton
            class="h-14 w-14"
            :ui="{
              rounded: 'rounded-full',
              background: 'bg-gray-300 dark:bg-gray-900',
            }"
          />
          <div class="space-y-2">
            <USkeleton
              class="h-4 w-[250px]"
              :ui="{
                background: 'bg-gray-300 dark:bg-gray-900',
              }"
            />
          </div>
        </div>
      </template>

      <template #empty> No people </template>

      <template #option="{ option: person }">
        <MiscSocialAccountProfile
          v-if="person"
          :key="person.uuid"
          :avatar-url="person.avatarUrl ?? ''"
          :logo="person.socialAccountTypeAvatarUrl ?? ''"
          :username="person.username"
          logo-size="3xs"
          avatar-size="lg"
        />
        <span v-if="person" class="truncate">{{ person.username }}</span>
      </template>
    </USelectMenu>

    <UButton
      icon="i-heroicons-arrow-right"
      size="xl"
      color="primary"
      :disabled="!selectedCreationPostSocialAccount"
      :label="t('posts.create.stepone.button')"
      trailing
      class="w-full justify-end"
      :onClick="submit"
    />
  </div>
</template>
