<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";
import { PostsAction } from "~/composables/api/posts/actions";
import { createPosts } from "~/composables/api/posts/createPosts";

const { t } = useNuxtApp().$i18n;
const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount"
);
const header = ref("");
const creationPostsTwitter = useState<Post[]>("CreationPostsTwitter");
const date = useState<Date | null>("datePost", () => null);

if (!selectedCreationPostSocialAccount.value) {
  navigateTo("/posts/create?step=one");
}

function formatDate(date: any) {
  return format(date, "dd/MM/yyyy, HH:mm", { locale: fr });
}

watch(
  () => date.value,
  (newValue) => {
    creationPostsTwitter.value.forEach((post) => {
      post.postAt = newValue ? newValue.toString() : null;
    });
  },
  { immediate: true }
);

watch(
  () => header.value,
  (newValue) => {
    creationPostsTwitter.value.forEach((post) => {
      post.header = newValue ? newValue.toString() : null;
    });
  },
  { immediate: true }
);

const submit = async () => {
  const posts = creationPostsTwitter.value.map((post) => ({
    id: post.id,
    groupType: post.groupType,
    header: post.header || null,
    body: post.body || null,
    pictures: post.pictures,
    postAt: post.postAt || null,
    socialAccountUuid: post.socialAccount.uuid,
  }));

  const response = await createPosts(posts);
  if (response.value.type === PostsAction.CREATE_POSTS_SUCCESS) {
    navigateTo("/?success=posts.create.success");
    selectedCreationPostSocialAccount.value = undefined;
    return;
  }

  const toast = useToast();
  toast.add({
    id: response.value.type,
    title: t("posts.create.create.error"),
    color: "red",
  });
};

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
  <div
    class="flex justify-center items-center h-[calc(100vh-4rem)] w-[auto] m-auto"
  >
    <div class="flex flex-col items-center space-y-4">
      <p class="font-semibold">
        {{ t("posts.create.stepthree.title") }}
      </p>
      <UInput
        v-model="header"
        color="primary"
        variant="outline"
        :placeholder="t('posts.create.stepthree.header')"
        class="w-full justify-center"
        size="lg"
      />
      <VueDatePicker
        v-model="date"
        :format-locale="fr"
        :format="formatDate"
        month-name-format="long"
        select-text="Valider"
        now-button-label="Maintenant"
        class="w-full justify-center font-light text-base text-slate-600 m-auto"
        :action-row="{
          showNow: true,
          showPreview: false,
          showCancel: false,
          showSelect: true,
        }"
        :day-names="['L', 'M', 'M', 'J', 'V', 'S', 'D']"
        utc
      />
      <UButton
        icon="i-heroicons-check"
        size="xl"
        color="primary"
        :label="t('posts.create.stepthree.button')"
        trailing
        class="w-full justify-center"
        @click="submit"
      />
    </div>
  </div>
</template>

<style></style>
