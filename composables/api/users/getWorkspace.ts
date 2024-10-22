import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { UsersUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";
import { UsersAction } from "./actions";
import type { UsersType } from "./types";

export async function postUserWorkspaceActive(
  workspaceUuid: string
): Promise<void> {
  const state = useState<UsersType>(UsersUseState.POST_USERS_WORKSPACE_ACTIVE);
  try {
    const client = new SocialPulseClient();
    const response = await client.postUserWorkspaceActive(workspaceUuid);

    if (response === null) {
      state.value = {
        type: UsersAction.POST_USER_WORKSPACE_ACTIVE_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError(
          "POST_USER_WORKSPACE_ACTIVE_HTTP_INTERNAL_ERROR"
        ),
      };
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: UsersAction.POST_USER_WORKSPACE_ACTIVE_SUCCESS,
          payload: response.data,
        };
        break;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: UsersAction.POST_USER_WORKSPACE_ACTIVE_NOT_FOUND,
          payload: new HttpNotFoundError(
            "POST_USER_WORKSPACE_ACTIVE_NOT_FOUND"
          ),
        };
        break;

      default:
        state.value = {
          type: UsersAction.POST_USER_WORKSPACE_ACTIVE_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError(
            "POST_USER_WORKSPACE_ACTIVE_HTTP_INTERNAL_ERROR"
          ),
        };
    }
  } catch (error) {}
}
