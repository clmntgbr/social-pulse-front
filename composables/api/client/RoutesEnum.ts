export enum SOCIAL_ACCOUNTS {
  GET_SOCIAL_ACCOUNTS = "/social_accounts",
  DELETE_SOCIAL_ACCOUNTS = "/social_accounts/",
  GET_LINKEDIN_LOGIN_URL = "/linkedin/login_url?callback=%s",
  GET_FACEBOOK_LOGIN_URL = "/facebook/login_url?callback=%s",
  GET_TWITTER_LOGIN_URL = "/twitter/login_url?callback=%s",
}

export enum WORKSPACES {
  GET_WORKSPACES = "/workspaces",
  GET_WORKSPACE = "/workspace",
}

export enum USERS {
  GET_USER = "/me",
  POST_USERS_WORKSPACE_ACTIVE = "/users/workspace",
}

export enum POSTS {
  CREATE_POSTS = "/posts",
  GET_POSTS = "/posts",
  GET_POST = "/posts/%s",
}
