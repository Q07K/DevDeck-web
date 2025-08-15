import { BaseAPI } from './client'
import {
  PostCreateRequest,
  PostUpdateRequest,
  PostDetailResponse,
  PostListResponse,
  PostsQueryParams,
  LikeResponse,
  CommentCreateRequest,
  CommentUpdateRequest,
  CommentResponse,
  PaginationParams
} from '../types/api'

export class PostAPI extends BaseAPI {
  /**
   * 글 작성
   */
  async createPost(postData: PostCreateRequest): Promise<PostDetailResponse> {
    return this.post<PostDetailResponse>('/api/v1/posts', postData)
  }

  /**
   * 글 목록 조회
   */
  async getPosts(params?: PostsQueryParams): Promise<PostListResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.query) queryParams.append('query', params.query)
    if (params?.tag) queryParams.append('tag', params.tag)

    const url = `/api/v1/posts${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<PostListResponse>(url)
  }

  /**
   * 글 상세 조회
   */
  async getPostDetail(postId: number): Promise<PostDetailResponse> {
    return this.get<PostDetailResponse>(`/api/v1/posts/${postId}`)
  }

  /**
   * 글 수정
   */
  async updatePost(postId: number, postData: PostUpdateRequest): Promise<PostDetailResponse> {
    return this.patch<PostDetailResponse>(`/api/v1/posts/${postId}`, postData)
  }

  /**
   * 글 삭제
   */
  async deletePost(postId: number): Promise<void> {
    return this.delete<void>(`/api/v1/posts/${postId}`)
  }

  /**
   * 글 좋아요/좋아요 취소 토글
   */
  async toggleLike(postId: number): Promise<LikeResponse> {
    return this.post<LikeResponse>(`/api/v1/posts/${postId}/like`)
  }

  /**
   * 내가 쓴 글 목록 조회
   */
  async getMyPosts(params?: PaginationParams): Promise<PostListResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const url = `/api/v1/me/posts${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<PostListResponse>(url)
  }

  /**
   * 댓글 작성
   */
  async createComment(postId: number, commentData: CommentCreateRequest): Promise<CommentResponse> {
    return this.post<CommentResponse>(`/api/v1/posts/${postId}/comments`, commentData)
  }

  /**
   * 댓글 수정
   */
  async updateComment(commentId: number, commentData: CommentUpdateRequest): Promise<CommentResponse> {
    return this.patch<CommentResponse>(`/api/v1/comments/${commentId}`, commentData)
  }

  /**
   * 댓글 삭제
   */
  async deleteComment(commentId: number): Promise<void> {
    return this.delete<void>(`/api/v1/comments/${commentId}`)
  }
}

// 싱글톤 인스턴스 생성
export const postAPI = new PostAPI()
