interface SocialAccount {
  "@id": string;
  "@type": "SocialAccount";
  socialAccountId: string;
  isVerified: boolean;
  username: string;
  name: string;
  avatarUrl: string;
  socialAccountTypeAvatarUrl: string;
  socialAccountType: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
  uuid: string;
}

export interface Post {
  "@id": string;
  "@type": "Post";
  groupUuid: string;
  groupType: string;
  header: string;
  body: string | null;
  pictures: string[];
  status: string;
  postAt: string;
  socialAccount: SocialAccount;
  uuid: string;
}

export interface GetPosts {
  "@context": string;
  "@id": string;
  "@type": "Collection";
  totalItems: number;
  member: Post[];
}
