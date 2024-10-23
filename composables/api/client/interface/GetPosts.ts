interface Post {
  postId: string | null;
  groupUuid: string;
  groupType: string;
  header: string | null;
  body: string | null;
  pictures: string[];
  status: string;
  postAt: string | null;
  uuid: string;
}

export interface GetPosts {
  "@context": string;
  "@id": string;
  "@type": "Collection";
  totalItems: number;
  member: Post[];
}
