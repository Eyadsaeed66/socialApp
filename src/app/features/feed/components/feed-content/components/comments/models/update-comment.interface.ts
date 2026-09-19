export interface UpdateCommentResponse {
  success: boolean;
  message: string;
  data: UpdateCommentData;
}

export interface UpdateCommentData {
  comment: UpdatedComment;
}

export interface UpdatedComment {
  image: any;
  _id: string;
  content: string;
  commentCreator: UpdateCommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export interface UpdateCommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

