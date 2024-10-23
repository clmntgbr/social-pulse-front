<script lang="ts" setup>
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";
import { PostsUseState } from "~/composables/api/client/UseState";
import { PostsAction } from "~/composables/api/posts/actions";
import type { PostsType } from "~/composables/api/posts/types";
import { SOCIAL_ACCOUNTS_TYPE } from "~/enums/SOCIAL_ACCOUNTS_TYPE";

const isOpenPostSlideover = useState<boolean>(
  "isOpenPostSlideover",
  () => false
);
const posts = useState<PostsType>(PostsUseState.GET_POST);
const masterPost = useState<Post | null>("masterPost", () => null);
const threadsPost = useState<Post[]>("threadsPost", () => []);

const selectedSocialAccount = useState<SocialAccount | null>(
  "selectedSocialAccount",
  () => null
);

watch(
  () => posts.value,
  () => {
    if (
      posts &&
      posts.value &&
      posts.value.type === PostsAction.GET_POST_SUCCESS &&
      posts.value.payload.length > 0
    ) {
      masterPost.value = posts.value.payload[0];
      selectedSocialAccount.value = masterPost.value.socialAccount;
      threadsPost.value = posts.value.payload.slice(1);
    }
  },
  { immediate: true }
);
</script>

<template>
  <USlideover v-model="isOpenPostSlideover" class="postSlideover">
    <UCard
      v-if="posts && posts.type === PostsAction.GET_POST_SUCCESS"
      class="flex flex-col flex-1 flex-container"
      :ui="{
        body: {
          base: 'flex-1 bodyCardSlideOver',
        },
        header: {
          base: 'headerCardSlideOver border-slate-250',
        },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="header-container text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center"
          >
            <MiscSocialAccountProfile
              :key="selectedSocialAccount?.uuid"
              :logo="selectedSocialAccount?.socialAccountTypeAvatarUrl"
              :avatar-url="selectedSocialAccount?.avatarUrl"
              :username="selectedSocialAccount?.username"
              class="mr-3"
            />
            {{ masterPost?.header }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpenPostSlideover = false"
          />
        </div>
      </template>
      <div class="scrollable-content px-4 py-5 sm:p-6">
        <CalendarSlideoverPostStatus
          :key="masterPost?.uuid"
          :post="masterPost"
        />
        <PostsFacebook
          v-if="
            selectedSocialAccount?.socialAccountType ===
            SOCIAL_ACCOUNTS_TYPE.FACEBOOK
          "
          :key="masterPost?.uuid"
          :socialAccount="selectedSocialAccount"
          :post="masterPost"
        />
        <PostsTwitter
          v-if="
            selectedSocialAccount?.socialAccountType ===
            SOCIAL_ACCOUNTS_TYPE.TWITTER
          "
          :key="masterPost?.uuid"
          :socialAccount="selectedSocialAccount"
          :post="masterPost"
        />
        <PostsTwitterThread
          v-for="item in threadsPost"
          v-if="
            selectedSocialAccount?.socialAccountType ===
            SOCIAL_ACCOUNTS_TYPE.TWITTER
          "
          :key="item?.uuid"
          :socialAccount="selectedSocialAccount"
          :post="item"
        />
        <PostsLinkedin
          v-if="
            selectedSocialAccount?.socialAccountType ===
            SOCIAL_ACCOUNTS_TYPE.LINKEDIN
          "
          :key="masterPost?.uuid"
          :socialAccount="selectedSocialAccount"
          :post="masterPost"
        />
      </div>
    </UCard>
  </USlideover>
</template>

<style>
.flex-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.bodyCardSlideOver {
  background-color: #f0f2f5;
  padding: 0 !important;
  flex: 1;
  overflow-y: auto;
}

.headerCardSlideOver {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-width: 1px;
}

.postSlideover {
  .max-w-md {
    max-width: 40rem !important;
  }
}
</style>
