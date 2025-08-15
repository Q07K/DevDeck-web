// API 클라이언트와 토큰 관리
export { apiClient, TokenManager } from './client'

// API 모듈들
export { authAPI, AuthAPI } from './auth'
export { userAPI, UserAPI } from './user'
export { postAPI, PostAPI } from './post'
export { adminAPI, AdminAPI } from './admin'
export { commonAPI, CommonAPI } from './common'

// Import instances for the unified API object
import { authAPI } from './auth'
import { userAPI } from './user'
import { postAPI } from './post'
import { adminAPI } from './admin'
import { commonAPI } from './common'

// 통합 API 객체 - 하나의 객체로 모든 API에 접근 가능
export const api = {
  auth: authAPI,
  user: userAPI,
  post: postAPI,
  admin: adminAPI,
  common: commonAPI,
}

// 타입 정의도 재수출
export * from '../types/api'
