<script lang="ts" setup>
import { DateTime } from "luxon";
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";
import { TwitterPostsValidator } from "~/composables/validators/TwitterPosts";
import { POSTS_STATUS } from "~/enums/POSTS_STATUS";

const creationPostsTwitter = useState<Post[]>("CreationPostsTwitter");
const selectedCreationPostsTwitter = useState<Post | null>(
  "SelectedCreationPostsTwitter"
);
const fileRef = ref<HTMLInputElement>();
const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount"
);
const { t } = useNuxtApp().$i18n;
const route = useRoute();
const router = useRouter();

selectedCreationPostsTwitter.value = {
  id: 0,
  uuid: crypto.randomUUID(),
  postId: null,
  groupUuid: crypto.randomUUID(),
  socialAccountType: selectedCreationPostSocialAccount.value?.socialAccountType,
  status: POSTS_STATUS.DRAFT,
  header: null,
  body: null,
  pictures: [],
  socialAccount: selectedCreationPostSocialAccount.value,
  socialAccountId: selectedCreationPostSocialAccount.value?.socialAccountId,
  postAt: null,
  groupType: "master",
  createdAt: DateTime.now(),
  updatedAt: DateTime.now(),
} as Post;

creationPostsTwitter.value = [selectedCreationPostsTwitter.value];

function bodyChange(event: string) {
  selectedCreationPostsTwitter.value!.body = event;
  const postIndex = creationPostsTwitter.value.findIndex(
    (post) => post.id === selectedCreationPostsTwitter.value?.id
  );
  if (postIndex !== -1) {
    creationPostsTwitter.value[postIndex].body = event;
  }
}

function onFileClick() {
  fileRef.value?.click();
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }

  if (input.files.length > 4) {
    const toast = useToast();
    toast.add({
      id: "too_much_images",
      title: `Vous ne pouvez ajouter que 4 images par post.`,
      color: "red",
    });
    return;
  }

  if (
    selectedCreationPostsTwitter.value &&
    selectedCreationPostsTwitter.value?.pictures.length > 4
  ) {
    const toast = useToast();
    toast.add({
      id: "too_much_images",
      title: `Vous ne pouvez ajouter que 4 images par post.`,
      color: "red",
    });
    return;
  }

  const files = Array.from(input.files);

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      selectedCreationPostsTwitter.value?.pictures.push(
        reader.result as string
      );
    };

    reader.readAsDataURL(file);
  });
}

function deletePicture(data: string) {
  selectedCreationPostsTwitter.value?.pictures.map((picture, index) => {
    if (picture === data) {
      selectedCreationPostsTwitter?.value?.pictures.splice(index, 1);
    }
  });
}

const updateStep = (newStep: string) => {
  router.push({
    query: {
      ...route.query,
      step: newStep,
    },
  });
};

const submit = async () => {
  const validate = await TwitterPostsValidator.validate(
    creationPostsTwitter.value
  ).catch(() => {
    return false;
  });

  if (validate) {
    return updateStep("three");
  }

  const toast = useToast();
  toast.add({
    id: "TwitterPostsValidator",
    title: t("posts.create.steptwo.empty"),
    color: "red",
  });
};
</script>

<template>
  <div class="max-w-screen-sm justify-between mx-auto relative h-full">
    <UButton
      :disabled="selectedCreationPostsTwitter!.pictures.length >= 4"
      @click="onFileClick"
      size="sm"
      square
      variant="soft"
    >
      <template #trailing>
        <UIcon name="i-heroicons-photo" class="w-5 h-5" />
      </template>
    </UButton>

    <input
      :key="selectedCreationPostsTwitter!.id ?? ''"
      multiple
      :model-value="selectedCreationPostsTwitter!.pictures"
      ref="fileRef"
      type="file"
      class="hidden"
      accept=".jpg, .jpeg, .png, .gif"
      @change="onFileChange"
    />
    <UTextarea
      color="gray"
      size="xl"
      :rows="10"
      autoresize
      class="text-left tracking-tight font-twitter font-normal justify-center align-middle"
      maxlength="280"
      :value="selectedCreationPostsTwitter?.body"
      :model-value="selectedCreationPostsTwitter?.body ?? ''"
      @update:model-value="bodyChange"
    />
    <UCarousel
      v-if="selectedCreationPostsTwitter!.pictures.length > 0"
      :items="selectedCreationPostsTwitter!.pictures"
      :ui="{ item: 'snap-start' }"
      arrows
      indicators
    >
      <template #default="{ item }">
        <UButton
          style="position: absolute"
          class="p-2 m-2"
          :ui="{ rounded: 'rounded-full' }"
          icon="i-heroicons-trash"
          @click="deletePicture(item)"
          size="sm"
        />
        <img :src="item" width="300" height="400" draggable="false" />
      </template>
    </UCarousel>

    <UButton
      icon="i-heroicons-arrow-right"
      size="xl"
      color="primary"
      :label="t('posts.create.stepone.button')"
      trailing
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full justify-center"
      @click="submit"
    />
  </div>
</template>
