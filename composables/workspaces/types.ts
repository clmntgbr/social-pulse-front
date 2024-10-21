import type { GetWorkspace } from "../client/interface/GetWorkspace";
import type { GetWorkspaces } from "../client/interface/GetWorkspaces";
import type { HttpNotFoundError } from "../HttpErrors";
import type { WorkspacesAction } from "./actions";

export type GetWorkspacesSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACES_SUCCESS;
  payload: GetWorkspaces;
};

export type GetWorkspacesNotFoundAction = {
  type: WorkspacesAction.GET_WORKSPACES_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetWorkspacesInternalErrorAction = {
  type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetWorkspacesErrorAction = {
  type: WorkspacesAction.GET_WORKSPACES_ERROR;
  payload: HttpNotFoundError;
};

export type GetWorkspaceSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACE_SUCCESS;
  payload: GetWorkspace;
};

export type GetWorkspaceNotFoundAction = {
  type: WorkspacesAction.GET_WORKSPACE_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetWorkspaceInternalErrorAction = {
  type: WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetWorkspaceErrorAction = {
  type: WorkspacesAction.GET_WORKSPACE_ERROR;
  payload: HttpNotFoundError;
};

export type WorkspacesType =
  | GetWorkspacesSuccessAction
  | GetWorkspacesNotFoundAction
  | GetWorkspacesInternalErrorAction
  | GetWorkspaceErrorAction
  | GetWorkspaceSuccessAction
  | GetWorkspaceNotFoundAction
  | GetWorkspaceInternalErrorAction
  | GetWorkspaceErrorAction;
