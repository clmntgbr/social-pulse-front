import { HTTP_STATUS } from "~/enums/HTTP_STATUS";
import type { CreatePosts } from "../client/interface/CreatePosts";
import SocialPulseClient from "../client/SocialPulseClient";
import { PostsUseState } from "../client/UseState";
import { HttpNotFoundError } from "../HttpErrors";
import { PostsAction } from "./actions";
import type { PostsType } from "./types";

export async function createPosts(
  body: CreatePosts
): Promise<Ref<PostsType, PostsType>> {
  const state = useState<PostsType>(PostsUseState.CREATE_POSTS);
  try {
    const client = new SocialPulseClient();
    const response = await client.createPosts(body);

    if (response === null) {
      state.value = {
        type: PostsAction.CREATE_POSTS_HTTP_INTERNAL_ERROR,
        payload: new HttpNotFoundError("GET_POST_HTTP_INTERNAL_ERROR"),
      };
      return state;
    }

    switch (response.status) {
      case HTTP_STATUS.CREATED:
        state.value = {
          type: PostsAction.CREATE_POSTS_SUCCESS,
          payload: response.data,
        };
        return state;

      case HTTP_STATUS.NOT_FOUND:
        state.value = {
          type: PostsAction.CREATE_POSTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get Social Accounts not found"),
        };
        return state;

      default:
        state.value = {
          type: PostsAction.CREATE_POSTS_HTTP_INTERNAL_ERROR,
          payload: new HttpNotFoundError("Get Social Accounts Internal Error"),
        };
        return state;
    }
  } catch (error) {
    return state;
  }
}
