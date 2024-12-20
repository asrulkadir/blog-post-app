export interface IPost {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

export interface IPostParams {
  page?: number;
  per_page?: number;
  title?: string;
}
