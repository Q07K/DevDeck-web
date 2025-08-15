// 기존 타입들과 API 타입들을 통합
export * from './api'

// 기존 타입들 (API 타입과 중복되지 않는 것들만 유지)
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
