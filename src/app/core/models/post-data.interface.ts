export interface PostDataResponse {
  success: boolean;
  message: string;
  data: PostsData;
  meta: Meta;
}

export interface PostsData {
  posts: Post[];
}

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: UserData;
  sharedPost: Post | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: Comment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface UserData {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: UserData;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  total: number;
}