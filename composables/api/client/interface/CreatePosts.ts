interface Post {
  id: number;
  groupType: string;
  header: string | null;
  body: string | null;
  pictures: string[];
  postAt: string | null;
  socialAccountUuid: string;
}

export type CreatePosts = Post[];
