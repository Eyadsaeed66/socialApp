export interface SinglePostResponse {
  success: boolean;
  message: string;
  data: SinglePost;
}

export interface SinglePost {
  post: Post;
}

export interface Post {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: any;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: any;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
    image?: string;
  id: string;
  bookmarked: boolean;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
