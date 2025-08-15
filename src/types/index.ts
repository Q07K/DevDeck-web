export interface User {
  id: number;
  nickname: string;
  email: string;
}

export interface Comment {
  id: number;
  authorId: number;
  content: string;
  parentCommentId: number | null;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  authorId: number;
  createdAt: string;
  tags: string[];
  comments: Comment[];
}
