<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { WorkspacesAction } from "~/composables/workspaces/actions";
import { getWorkspace } from "~/composables/workspaces/getWorkspace";
import { getWorkspaces } from "~/composables/workspaces/getWorkspaces";
import type { WorkspacesType } from "~/composables/workspaces/types";

const workspaces = useState<WorkspacesType>("GetWorkspaces");
const workspace = useState<WorkspacesType>("GetWorkspace");

await getWorkspaces();
await getWorkspace();

const selectedWorkspaceUuid = useState<string | null>("Workspace", () => null);

watch(
  () => selectedWorkspaceUuid.value,
  async (workspaceUuid) => {
    if (workspaceUuid) {
      refreshNuxtData("GetSocialAccounts");
    }
  },
  { immediate: true }
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
