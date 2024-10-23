<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";

const selectedCreationPostSocialAccount = useState<SocialAccount | undefined>(
  "SelectedCreationPostSocialAccount"
);

const creationPostsTwitter = useState<Post[]>("CreationPostsTwitter");
const { t } = useNuxtApp().$i18n;
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
    if (newValue) {
      creationPostsTwitter.value.forEach((post) => {
        post.postAt = newValue.toString();
      });
    }
  },
  { immediate: true }
);

const submit = async () => {
  console.log(creationPostsTwitter.value);
};
</script>

<template>
  <div
    class="flex justify-center items-center h-[calc(100vh-4rem)] w-[auto] m-auto"
  >
    <div class="flex flex-col items-center space-y-4">
      <p class="font-semibold">
        {{ t("posts.create.stepthree.title") }}
      </p>
      <VueDatePicker
        style="width: 400px"
        v-model="date"
        :format-locale="fr"
        :format="formatDate"
        month-name-format="long"
        select-text="Valider"
        now-button-label="Maintenant"
        :action-row="{
          showNow: true,
          showPreview: false,
          showCancel: false,
          showSelect: true,
        }"
        :day-names="['L', 'M', 'M', 'J', 'V', 'S', 'D']"
        utc
        class="font-light text-base text-slate-600 m-auto"
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
