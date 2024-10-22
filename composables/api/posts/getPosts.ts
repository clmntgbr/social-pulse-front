import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import SocialPulseClient from "../client/SocialPulseClient";
import { PostsUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";
import { PostsAction } from "./actions";
import type { PostsType } from "./types";

export async function getPosts(): Promise<Ref<PostsType, PostsType>> {
  const state = useState<PostsType>(PostsUseState.GET_POSTS);
  try {
    const client = new SocialPulseClient();
    const response = await client.getPosts();

    if (response === null) {
      state.value = {
        type: PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("Get Workspaces Internal Error"),
      };
      return state;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        state.value = {
          type: PostsAction.GET_POSTS_SUCCESS,
          payload: response.data,
        };
        return state;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: PostsAction.GET_POSTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        };
        return state;

      default:
        state.value = {
          type: PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        };
        return state;
    }
  } catch (error) {
    return state;
  }
}
