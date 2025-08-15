// API 요청/응답 타입 정의

// 공통 응답 타입
export interface APIResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

// 페이지네이션 관련
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationResponse {
  totalPages: number
  currentPage: number
}

// 인증 관련
export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  accessToken: string
  token_type?: string
}

export interface UserSignupRequest {
  email: string
  password: string
  nickname: string
}

export interface UserUpdateRequest {
  nickname?: string
  password?: string
}

export interface UserResponse {
  id: number
  email: string
  nickname: string
  createdAt: string
}

export interface UserPublicResponse {
  id: number
  nickname: string
  createdAt: string
}

// 작성자 정보
export interface AuthorResponse {
  id: number
  nickname: string
}

// 게시글 관련
export interface PostCreateRequest {
  title: string
  content: string
  tags?: string[]
}

export interface PostUpdateRequest {
  title?: string
  content?: string
  tags?: string[]
}

export interface PostSummaryResponse {
  id: number
  title: string
  summary: string
  likeCount: number
  commentCount: number
  author: AuthorResponse
  createdAt: string
}

export interface PostDetailResponse {
  id: number
  title: string
  content: string
  viewCount: number
  likeCount: number
  createdAt: string
  author: AuthorResponse
  tags: string[]
  comments: CommentResponse[]
}

export interface PostListResponse extends PaginationResponse {
  posts: PostSummaryResponse[]
}

export interface PostsQueryParams extends PaginationParams {
  sort?: 'latest' | 'popular'
  query?: string
  tag?: string
}

// 댓글 관련
export interface CommentCreateRequest {
  content: string
  parentCommentId?: number
}

export interface CommentUpdateRequest {
  content: string
}

export interface CommentResponse {
  id: number
  content: string
  author: AuthorResponse
  createdAt: string
  parentCommentId?: number
  replies: CommentResponse[]
}

// 좋아요 관련
export interface LikeResponse {
  likeCount: number
  userLiked: boolean
}

// 관리자 관련
export interface AdminDashboardResponse {
  totalUsers: number
  todaySignups: number
  totalPosts: number
  todayPosts: number
  totalComments: number
}

export interface AdminDeleteRequest {
  deleteType?: 'soft' | 'hard'
}

// 공지사항 관련
export interface AnnouncementCreateRequest {
  title: string
  content: string
  isActive?: boolean
}

export interface AnnouncementResponse {
  id: number
  title: string
  content: string
  isActive: boolean
  createdAt: string
}

// 에러 관련
export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface HTTPValidationError {
  detail: ValidationError[]
}
