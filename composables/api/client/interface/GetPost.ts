export interface Post {
  id: number;
  uuid: string;
  postId: string | null;
  groupUuid: string;
  groupType: string;
  header: string | null;
  body: string | null;
  pictures: string[];
  status: string;
  postAt: string | null;
  socialAccount: SocialAccount;
}

export interface SocialAccount {
  "@id": string;
  "@type": string;
  uuid: string;
  socialAccountId: string;
  isVerified: boolean;
  username: string;
  name: string;
  avatarUrl: string;
  socialAccountTypeAvatarUrl: string;
  status: string;
  socialAccountType: string;
  email: string | null;
  givenName: string | null;
  familyName: string | null;
}

export type GetPost = Post[];
