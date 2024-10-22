import type { GetUser } from "../client/interface/GetUser";
import type { PostUserWorkspaceActive } from "../client/interface/PostUserWorkspaceActive";
import type { HttpNotFoundError } from "../HttpErrors";
import type { UsersAction } from "./actions";

export type GetUserSuccessAction = {
  type: UsersAction.GET_USER_SUCCESS;
  payload: GetUser;
};

export type GetUserNotFoundAction = {
  type: UsersAction.GET_USER_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetUserInternalErrorAction = {
  type: UsersAction.GET_USER_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetUserErrorAction = {
  type: UsersAction.GET_USER_ERROR;
  payload: HttpNotFoundError;
};

export type PostUserWorkspaceActiveSuccessAction = {
  type: UsersAction.POST_USER_WORKSPACE_ACTIVE_SUCCESS;
  payload: PostUserWorkspaceActive;
};

export type PostUserWorkspaceActiveNotFoundAction = {
  type: UsersAction.POST_USER_WORKSPACE_ACTIVE_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type PostUserWorkspaceActiveInternalErrorAction = {
  type: UsersAction.POST_USER_WORKSPACE_ACTIVE_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type PostUserWorkspaceActiveErrorAction = {
  type: UsersAction.POST_USER_WORKSPACE_ACTIVE_ERROR;
  payload: HttpNotFoundError;
};

export type UsersType =
  | GetUserSuccessAction
  | GetUserNotFoundAction
  | GetUserInternalErrorAction
  | PostUserWorkspaceActiveErrorAction
  | PostUserWorkspaceActiveSuccessAction
  | PostUserWorkspaceActiveNotFoundAction
  | PostUserWorkspaceActiveInternalErrorAction
  | PostUserWorkspaceActiveErrorAction;
