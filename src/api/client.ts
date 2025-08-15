import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 환경변수에서 API URL을 가져오거나 기본값 사용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Axios 인스턴스 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 토큰 관리
export class TokenManager {
  private static readonly TOKEN_KEY = 'devdeck_access_token'

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  static hasToken(): boolean {
    return !!this.getToken()
  }
}

// 요청 인터셉터 - 인증 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 에러 처리 및 토큰 만료 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      TokenManager.removeToken()
      // Vue Router를 직접 사용할 수 없으므로 이벤트를 발생시켜 처리
      window.dispatchEvent(new CustomEvent('auth-error'))
    }
    
    // 에러 메시지 정규화
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred'
    
    return Promise.reject({
      ...error,
      message: errorMessage,
      status: error.response?.status
    })
  }
)

// API 응답 타입
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
}

// 기본 API 클래스
export abstract class BaseAPI {
  protected client = apiClient

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.request<T>(config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  protected patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}
