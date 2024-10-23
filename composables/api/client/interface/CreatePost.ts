export interface CreatePost {
  id: number;
  groupType: string;
  header: string | null;
  body: string | null;
  pictures: string[];
  postAt: string | null;
  socialAccountUuid: string;
}
