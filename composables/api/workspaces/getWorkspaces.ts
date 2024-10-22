import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { WorkspacesUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";
import { WorkspacesAction } from "./actions";
import type { WorkspacesType } from "./types";

export async function getWorkspaces(): Promise<void> {
  const state = useState<WorkspacesType>(WorkspacesUseState.GET_WORKSPACES);
  try {
    const client = new SocialPulseClient();
    const response = await client.getWorkspaces();

    if (response === null) {
      state.value = {
        type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Workspaces Internal Error"),
      };
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACES_SUCCESS,
          payload: response.data,
        };
        break;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACES_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        };
        break;

      default:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        };
    }
  } catch (error) {}
}
