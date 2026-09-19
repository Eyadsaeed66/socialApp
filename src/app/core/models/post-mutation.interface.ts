export interface PostMutationResponse {
  success: boolean;
  message: string;
  data: PostMutation;
}

export interface PostMutation {
  post: Post;
}

export interface Post {
  _id: string;
  id: string;

  body: string;
  privacy: string;

  user: string;

  image: PostImage | null;

  sharedPost: Post | null;

  likes: any[];

  likesCount: number;

  isShare: boolean;

  createdAt: string;
}

export interface PostImage {
  url: string;
  publicId?: string;
}
