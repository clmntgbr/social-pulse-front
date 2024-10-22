// composables/socialAccountsClient.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { GetLoginUrl } from "./interface/GetLoginUrl";
import type { GetPosts } from "./interface/GetPosts";
import type { GetSocialAccounts } from "./interface/GetSocialAccounts";
import type { GetUser } from "./interface/GetUser";
import type { GetWorkspace } from "./interface/GetWorkspace";
import type { GetWorkspaces } from "./interface/GetWorkspaces";
import type { PostUserWorkspaceActive } from "./interface/PostUserWorkspaceActive";
import { POSTS, SOCIAL_ACCOUNTS, USERS, WORKSPACES } from "./RoutesEnum";

export default class SocialPulseClient {
  private httpClient: AxiosInstance;

  constructor() {
    const config = useRuntimeConfig();
    const { token } = useAuth();

    this.httpClient = axios.create({
      baseURL: config.public.apiBase,
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.value}`,
      },
    });
  }

  public async getSocialAccounts(): Promise<AxiosResponse<GetSocialAccounts> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_SOCIAL_ACCOUNTS);
    } catch (e) {
      return null;
    }
  }

  public async getWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACES);
    } catch (e) {
      return null;
    }
  }

  public async getWorkspace(): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACE);
    } catch (e) {
      return null;
    }
  }

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch (e) {
      return null;
    }
  }

  public async getPosts(): Promise<AxiosResponse<GetPosts> | null> {
    try {
      return await this.httpClient.get(POSTS.GET_POSTS);
    } catch (e) {
      return null;
    }
  }

  public async getFacebookLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    const route = useRoute();
    try {
      return await this.httpClient.get(
        SOCIAL_ACCOUNTS.GET_FACEBOOK_LOGIN_URL.replace(
          "%s",
          route.path?.toString() ?? "/"
        )
      );
    } catch (e) {
      return null;
    }
  }

  public async getLinkedinLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    const route = useRoute();
    try {
      return await this.httpClient.get(
        SOCIAL_ACCOUNTS.GET_LINKEDIN_LOGIN_URL.replace(
          "%s",
          route.path?.toString() ?? "/"
        )
      );
    } catch (e) {
      return null;
    }
  }

  public async getTwitterLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    const route = useRoute();
    try {
      return await this.httpClient.get(
        SOCIAL_ACCOUNTS.GET_TWITTER_LOGIN_URL.replace(
          "%s",
          route.path?.toString() ?? "/"
        )
      );
    } catch (e) {
      return null;
    }
  }

  public async postUserWorkspaceActive(
    workspaceUuid: string
  ): Promise<AxiosResponse<PostUserWorkspaceActive> | null> {
    try {
      return await this.httpClient.post(USERS.POST_USERS_WORKSPACE_ACTIVE, {
        workspaceUuid: workspaceUuid,
      });
    } catch (e) {
      return null;
    }
  }
}
