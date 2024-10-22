import type { GetLoginUrl } from "../client/interface/GetLoginUrl";
import type { GetSocialAccounts } from "../client/interface/GetSocialAccounts";
import type { HttpNotFoundError } from "../HttpErrors";
import type { SocialAccountsAction } from "./actions";

export type GetSocialAccountsSuccessAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS;
  payload: GetSocialAccounts;
};

export type GetSocialAccountsNotFoundAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetSocialAccountsInternalErrorAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetSocialAccountsErrorAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_ERROR;
  payload: HttpNotFoundError;
};

export type GetLoginUrlSuccessAction = {
  type: SocialAccountsAction.GET_LOGIN_URL_SUCCESS;
  payload: GetLoginUrl;
};

export type GetLoginUrlNotFoundAction = {
  type: SocialAccountsAction.GET_LOGIN_URL_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetLoginUrlInternalErrorAction = {
  type: SocialAccountsAction.GET_LOGIN_URL_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetLoginUrlErrorAction = {
  type: SocialAccountsAction.GET_LOGIN_URL_ERROR;
  payload: HttpNotFoundError;
};

export type SocialAccountsType =
  | GetSocialAccountsSuccessAction
  | GetSocialAccountsNotFoundAction
  | GetSocialAccountsInternalErrorAction
  | GetSocialAccountsErrorAction
  | GetLoginUrlSuccessAction
  | GetLoginUrlNotFoundAction
  | GetLoginUrlInternalErrorAction
  | GetLoginUrlErrorAction;
