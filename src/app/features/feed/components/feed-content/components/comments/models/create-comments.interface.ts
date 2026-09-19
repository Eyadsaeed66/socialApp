export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: CreateCommentData;
}

export interface CreateCommentData {
  comment: CreatedComment;
}

export interface CreatedComment {
  _id: string;
  content: string;
  commentCreator: CreateCommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export interface CreateCommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

