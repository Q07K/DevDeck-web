import { BaseAPI } from './client'
import { 
  UserResponse, 
  UserPublicResponse, 
  UserUpdateRequest,
  PaginationParams
} from '../types/api'

export class UserAPI extends BaseAPI {
  /**
   * 내 프로필 조회
   */
  async getMyProfile(): Promise<UserResponse> {
    return this.get<UserResponse>('/api/v1/me')
  }

  /**
   * 내 프로필 수정
   */
  async updateMyProfile(userData: UserUpdateRequest): Promise<UserResponse> {
    return this.patch<UserResponse>('/api/v1/me', userData)
  }

  /**
   * 특정 사용자 프로필 조회 (공개 정보)
   */
  async getUserProfile(userId: number): Promise<UserPublicResponse> {
    return this.get<UserPublicResponse>(`/api/v1/users/${userId}`)
  }

  /**
   * 특정 사용자가 작성한 글 목록 조회
   */
  async getUserPosts(userId: number, params?: PaginationParams): Promise<any> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    
    const url = `/api/v1/users/${userId}/posts${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<any>(url)
  }
}

// 싱글톤 인스턴스 생성
export const userAPI = new UserAPI()
