import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { SocialAccountsAction } from "./actions";
import type { SocialAccountsType } from "./types";

export async function getSocialAccounts(): Promise<void> {
  try {
    const client = new SocialPulseClient();
    const response = await client.getSocialAccounts();

    if (response === null) {
      useState<SocialAccountsType>("GetSocialAccounts", () => ({
        type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
      }));
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        useState<SocialAccountsType>("GetSocialAccounts", () => ({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS,
          payload: response.data,
        }));
        break;

      case HTTP_STATUS.NOT_FOUND:
        useState<SocialAccountsType>("GetSocialAccounts", () => ({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        }));
        break;

      default:
        useState<SocialAccountsType>("GetSocialAccounts", () => ({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        }));
    }
  } catch (error) {}
}
