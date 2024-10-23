<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { SocialAccount } from "~/composables/api/client/interface/GetPost";
import { WorkspacesUseState } from "~/composables/api/client/UseState";
import { getPosts } from "~/composables/api/posts/getPosts";
import { getSocialAccounts } from "~/composables/api/social_accounts/getSocialAccounts";
import { getUser } from "~/composables/api/users/getUser";
import { postUserWorkspaceActive } from "~/composables/api/users/getWorkspace";
import { WorkspacesAction } from "~/composables/api/workspaces/actions";
import { getWorkspace } from "~/composables/api/workspaces/getWorkspace";
import { getWorkspaces } from "~/composables/api/workspaces/getWorkspaces";
import type { WorkspacesType } from "~/composables/api/workspaces/types";

const workspaces = useState<WorkspacesType>(WorkspacesUseState.GET_WORKSPACES);
const workspace = useState<WorkspacesType>(WorkspacesUseState.GET_WORKSPACE);

await getWorkspaces();
await getWorkspace();

const selectedWorkspaceUuid = useState<string | null>(
  "selectedWorkspaceUuid",
  () => null
);

watch(
  () => selectedWorkspaceUuid.value,
  async (workspaceUuid) => {
    if (workspaceUuid) {
      await postUserWorkspaceActive(workspaceUuid);
      getSocialAccounts();
      getUser();
      getWorkspace();
      getPosts();

      const selectedCreationPostSocialAccount = useState<
        SocialAccount | undefined
      >("SelectedCreationPostSocialAccount", () => undefined);
      selectedCreationPostSocialAccount.value = undefined;
    }
  }
);

watch(
  () => workspace.value,
  (value) => {
    if (
      value &&
      value.type === WorkspacesAction.GET_WORKSPACE_SUCCESS &&
      value.payload?.uuid
    ) {
      selectedWorkspaceUuid.value = value.payload.uuid;
    }
  },
  { immediate: true }
);

function getWorkspaceLabel(uuid: string): string | undefined {
  if (
    workspaces.value &&
    workspaces.value.type === WorkspacesAction.GET_WORKSPACES_SUCCESS &&
    workspaces.value.payload
  ) {
    const workspace = workspaces.value.payload.member.find(
      (ws) => ws.uuid === uuid
    );
    return workspace ? workspace.label : undefined;
  }
  return undefined;
}

const isCollapsed = false;
</script>

<template>
  <Select v-if="selectedWorkspaceUuid" v-model="selectedWorkspaceUuid">
    <SelectTrigger
      :class="
        cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
          {
            'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden':
              isCollapsed,
          }
        )
      "
    >
      <SelectValue placeholder="Select an account">
        <div class="flex items-center gap-3">
          <UAvatar size="3xs" src="https://avatar.vercel.sh/personal.png" />
          <span v-if="!isCollapsed">
            {{ getWorkspaceLabel(selectedWorkspaceUuid) }}
          </span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent
      v-if="
        workspaces &&
        workspaces.type === WorkspacesAction.GET_WORKSPACES_SUCCESS &&
        workspaces.payload.member
      "
    >
      <SelectItem
        v-for="account in workspaces.payload.member"
        :key="account.uuid"
        :value="account.uuid"
      >
        <div
          class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
        >
          <UAvatar size="3xs" src="https://avatar.vercel.sh/personal.png" />
          {{ account.label }}
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<style lang="css">
.focus\:ring-ring:focus {
  --tw-ring-color: hsl(222.2deg 84% 4.9% / 0%);
}
</style>
