import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { SocialAccountsAction } from "./actions";
import type { SocialAccountsType } from "./types";
import { SocialAccountsUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";

export async function getSocialAccounts(): Promise<
  Ref<SocialAccountsType, SocialAccountsType>
> {
  const state = useState<SocialAccountsType>(
    SocialAccountsUseState.GET_SOCIAL_ACCOUNTS
  );
  try {
    const client = new SocialPulseClient();
    const response = await client.getSocialAccounts();

    if (response === null) {
      state.value = {
        type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
      };
      return state;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS,
          payload: response.data,
        };
        return state;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        };
        return state;

      default:
        state.value = {
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        };
        return state;
    }
  } catch (error) {
    return state;
  }
}
