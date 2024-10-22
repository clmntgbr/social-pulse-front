import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { UsersUseState } from "../client/UseState";
import { UsersAction } from "./actions";
import type { UsersType } from "./types";
import { HttpNotFoundError } from "../HttpErrors";

export async function getUser(): Promise<void> {
  const state = useState<UsersType>(UsersUseState.GET_USER);
  try {
    const client = new SocialPulseClient();
    const response = await client.getUser();

    if (response === null) {
      state.value = {
        type: UsersAction.GET_USER_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("GET_USER_HTTP_INTERNAL_ERROR"),
      };
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: UsersAction.GET_USER_SUCCESS,
          payload: response.data,
        };
        break;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: UsersAction.GET_USER_NOT_FOUND,
          payload: new HttpNotFoundError("GET_USER_NOT_FOUND"),
        };
        break;

      default:
        state.value = {
          type: UsersAction.GET_USER_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("GET_USER_HTTP_INTERNAL_ERROR"),
        };
    }
  } catch (error) {}
}
