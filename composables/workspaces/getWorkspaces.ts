import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { WorkspacesAction } from "./actions";
import type { WorkspacesType } from "./types";

export async function getWorkspaces(): Promise<void> {
  try {
    const client = new SocialPulseClient();
    const response = await client.getWorkspaces();

    if (response === null) {
      useState<WorkspacesType>("GetWorkspaces", () => ({
        type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Workspaces Internal Error"),
      }));
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        useState<WorkspacesType>("GetWorkspaces", () => ({
          type: WorkspacesAction.GET_WORKSPACES_SUCCESS,
          payload: response.data,
        }));
        break;

      case HTTP_STATUS.NOT_FOUND:
        useState<WorkspacesType>("GetWorkspaces", () => ({
          type: WorkspacesAction.GET_WORKSPACES_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        }));
        break;

      default:
        useState<WorkspacesType>("GetWorkspaces", () => ({
          type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        }));
    }
  } catch (error) {}
}
