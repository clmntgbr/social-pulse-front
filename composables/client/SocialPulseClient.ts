// composables/socialAccountsClient.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { GetSocialAccounts } from "./interface/GetSocialAccounts";
import type { GetWorkspace } from "./interface/GetWorkspace";
import type { GetWorkspaces } from "./interface/GetWorkspaces";
import { SOCIAL_ACCOUNTS, WORKSPACES } from "./RoutesEnum";

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
}
