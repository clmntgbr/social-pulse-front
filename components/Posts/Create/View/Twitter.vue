<script lang="ts" setup>
import { DateTime } from "luxon";
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";
import { POSTS_STATUS } from "~/enums/POSTS_STATUS";
import { SOCIAL_ACCOUNTS_TYPE } from "~/enums/SOCIAL_ACCOUNTS_TYPE";

const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount"
);

const selectedCreationPostsTwitter = useState<Post | null>(
  "SelectedCreationPostsTwitter"
);

const creationPostsTwitter = useState<Post[]>("CreationPostsTwitter", () => []);

const masterPost = useState<Post | null>(
  "CreationPostsTwitterMaster",
  () => null
);

const threadsPost = useState<Post[]>("CreationPostsTwitterThreads", () => []);

const addTwitterThread = () => {
  const pushId = creationPostsTwitter.value.length;
  creationPostsTwitter.value.push({
    id: pushId,
    uuid: crypto.randomUUID(),
    postId: null,
    groupUuid: "",
    groupType: "slave",
    socialAccountType:
      selectedCreationPostSocialAccount.value?.socialAccountType,
    status: POSTS_STATUS.DRAFT,
    header: null,
    body: null,
    pictures: [],
    socialAccount: selectedCreationPostSocialAccount.value,
    socialAccountId: selectedCreationPostSocialAccount.value?.socialAccountId,
    postAt: null,
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
  } as Post);
};

const selectCreationPosts = (post: Post | null) => {
  if (post) {
    selectedCreationPostsTwitter.value = post;
  }
};

watch(
  () => creationPostsTwitter.value,
  (posts) => {
    if (posts.length > 0) {
      masterPost.value = creationPostsTwitter.value[0];
      threadsPost.value = creationPostsTwitter.value.slice(1);
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="max-w-screen-sm justify-between mx-auto">
    <PostsTwitter
      v-if="
        selectedCreationPostSocialAccount?.socialAccountType ===
        SOCIAL_ACCOUNTS_TYPE.TWITTER
      "
      :key="JSON.stringify(masterPost)"
      :social-account="selectedCreationPostSocialAccount"
      :post="masterPost"
      :is-selectable="true"
      @click="selectCreationPosts(masterPost)"
    />
    <PostsTwitterThread
      v-for="item in threadsPost"
      v-if="
        selectedCreationPostSocialAccount?.socialAccountType ===
        SOCIAL_ACCOUNTS_TYPE.TWITTER
      "
      :key="JSON.stringify(creationPostsTwitter)"
      :socialAccount="selectedCreationPostSocialAccount"
      :post="item"
      :is-selectable="true"
      :is-deletable="true"
      @click="selectCreationPosts(item)"
    />

    <div class="mt-4 justify-between text-center w-full">
      <UButton
        label="Ajouter un thread"
        :hasIcon="true"
        icon="i-heroicons-plus"
        :onClick="addTwitterThread"
      />
    </div>
  </div>
</template>

<style></style>
