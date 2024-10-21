import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { WorkspacesAction } from "./actions";
import type { WorkspacesType } from "./types";

export async function getWorkspace(): Promise<void> {
  try {
    const client = new SocialPulseClient();
    const response = await client.getWorkspace();

    if (response === null) {
      useState<WorkspacesType>("GetWorkspace", () => ({
        type: WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Workspace Internal Error"),
      }));
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        useState<WorkspacesType>("GetWorkspace", () => ({
          type: WorkspacesAction.GET_WORKSPACE_SUCCESS,
          payload: response.data,
        }));
        break;

      case HTTP_STATUS.NOT_FOUND:
        useState<WorkspacesType>("GetWorkspace", () => ({
          type: WorkspacesAction.GET_WORKSPACE_NOT_FOUND,
          payload: new HttpNotFoundError("Get Workspace not found"),
        }));
        break;

      default:
        useState<WorkspacesType>("GetWorkspace", () => ({
          type: WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Workspace Internal Error"),
        }));
    }
  } catch (error) {}
}
