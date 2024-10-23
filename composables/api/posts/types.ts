import type { GetPost } from "../client/interface/GetPost";
import type { GetPosts } from "../client/interface/GetPosts";
import type { HttpNotFoundError } from "../HttpErrors";
import type { PostsAction } from "./actions";

export type GetPostsSuccessAction = {
  type: PostsAction.GET_POSTS_SUCCESS;
  payload: GetPosts;
};

export type GetPostsNotFoundAction = {
  type: PostsAction.GET_POSTS_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetPostsInternalErrorAction = {
  type: PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetPostsErrorAction = {
  type: PostsAction.GET_POSTS_ERROR;
  payload: HttpNotFoundError;
};

export type GetPostSuccessAction = {
  type: PostsAction.GET_POST_SUCCESS;
  payload: GetPost;
};

export type GetPostNotFoundAction = {
  type: PostsAction.GET_POST_NOT_FOUND;
  payload: HttpNotFoundError;
};

export type GetPostInternalErrorAction = {
  type: PostsAction.GET_POST_HTTP_INTERNAL_ERROR;
  payload: HttpNotFoundError;
};

export type GetPostErrorAction = {
  type: PostsAction.GET_POST_ERROR;
  payload: HttpNotFoundError;
};

export type PostsType =
  | GetPostsSuccessAction
  | GetPostsNotFoundAction
  | GetPostsInternalErrorAction
  | GetPostsErrorAction
  | GetPostSuccessAction
  | GetPostNotFoundAction
  | GetPostInternalErrorAction
  | GetPostErrorAction;
