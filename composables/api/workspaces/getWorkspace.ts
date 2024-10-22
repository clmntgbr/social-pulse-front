import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { WorkspacesUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";
import { WorkspacesAction } from "./actions";
import type { WorkspacesType } from "./types";

export async function getWorkspace(): Promise<void> {
  const state = useState<WorkspacesType>(WorkspacesUseState.GET_WORKSPACE);
  try {
    const client = new SocialPulseClient();
    const response = await client.getWorkspace();

    if (response === null) {
      state.value = {
        type: WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Workspace Internal Error"),
      };
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACE_SUCCESS,
          payload: response.data,
        };
        break;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACE_NOT_FOUND,
          payload: new HttpNotFoundError("Get Workspace not found"),
        };
        break;

      default:
        state.value = {
          type: WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Workspace Internal Error"),
        };
    }
  } catch (error) {}
}
