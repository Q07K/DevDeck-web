import { BaseAPI } from './client'
import {
  AdminDashboardResponse,
  PostListResponse,
  AdminDeleteRequest,
  AnnouncementCreateRequest,
  AnnouncementResponse,
  PaginationParams
} from '../types/api'

export class AdminAPI extends BaseAPI {
  /**
   * 관리자 대시보드 통계 조회
   */
  async getDashboard(): Promise<AdminDashboardResponse> {
    return this.get<AdminDashboardResponse>('/api/v1/admin/dashboard')
  }

  /**
   * 관리자용 전체 글 목록 조회
   */
  async getAllPosts(params?: PaginationParams): Promise<PostListResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const url = `/api/v1/admin/posts${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<PostListResponse>(url)
  }

  /**
   * 관리자에 의한 글 삭제
   */
  async deletePost(postId: number, deleteRequest?: AdminDeleteRequest): Promise<void> {
    return this.delete<void>(`/api/v1/admin/posts/${postId}`, {
      data: deleteRequest || { deleteType: 'soft' }
    })
  }

  /**
   * 관리자에 의한 댓글 삭제
   */
  async deleteComment(commentId: number): Promise<void> {
    return this.delete<void>(`/api/v1/admin/comments/${commentId}`)
  }

  /**
   * 활성화된 공지사항 조회 (일반 사용자용)
   */
  async getActiveAnnouncements(): Promise<AnnouncementResponse[]> {
    return this.get<AnnouncementResponse[]>('/api/v1/admin/announcements')
  }

  /**
   * 공지사항 작성
   */
  async createAnnouncement(announcementData: AnnouncementCreateRequest): Promise<AnnouncementResponse> {
    return this.post<AnnouncementResponse>('/api/v1/admin/announcements', announcementData)
  }
}

// 싱글톤 인스턴스 생성
export const adminAPI = new AdminAPI()
