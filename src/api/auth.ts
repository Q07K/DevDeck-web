import { BaseAPI, TokenManager } from './client'
import { 
  LoginRequest, 
  TokenResponse, 
  UserSignupRequest, 
  UserResponse 
} from '../types/api'

export class AuthAPI extends BaseAPI {
  /**
   * 로그인
   */
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await this.post<TokenResponse>('/api/v1/auth/login', credentials)
    
    // 토큰 자동 저장
    if (response.accessToken) {
      TokenManager.setToken(response.accessToken)
    }
    
    return response
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    try {
      await this.post('/api/v1/auth/logout')
    } finally {
      // API 호출 성공/실패 관계없이 로컬 토큰 제거
      TokenManager.removeToken()
    }
  }

  /**
   * 회원가입
   */
  async signup(userData: UserSignupRequest): Promise<UserResponse> {
    return this.post<UserResponse>('/api/v1/users/signup', userData)
  }

  /**
   * 로그인 상태 확인
   */
  isLoggedIn(): boolean {
    return TokenManager.hasToken()
  }

  /**
   * 현재 토큰 가져오기
   */
  getToken(): string | null {
    return TokenManager.getToken()
  }
}

// 싱글톤 인스턴스 생성
export const authAPI = new AuthAPI()
