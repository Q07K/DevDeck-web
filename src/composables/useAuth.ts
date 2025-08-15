import { ref, computed, onMounted } from 'vue'
import { api, TokenManager } from '../api'
import type { UserResponse } from '../api'

/**
 * 인증 관련 Composable
 */
export function useAuth() {
  const user = ref<UserResponse | null>(null)
  const isLoggedIn = computed(() => TokenManager.hasToken() && user.value !== null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      await api.auth.login({ email, password })
      
      // 로그인 성공 후 사용자 정보 가져오기
      user.value = await api.user.getMyProfile()
      
      return true
    } catch (err: any) {
      error.value = err.message || '로그인에 실패했습니다.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // 로그아웃
  const logout = async () => {
    try {
      await api.auth.logout()
    } finally {
      user.value = null
    }
  }

  // 회원가입
  const signup = async (email: string, password: string, nickname: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const newUser = await api.auth.signup({ email, password, nickname })
      return newUser
    } catch (err: any) {
      error.value = err.message || '회원가입에 실패했습니다.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 사용자 정보 새로고침
  const refreshUser = async () => {
    if (!TokenManager.hasToken()) return
    
    try {
      user.value = await api.user.getMyProfile()
    } catch (err) {
      // 토큰이 유효하지 않은 경우 로그아웃
      await logout()
    }
  }

  // 초기화 시 사용자 정보 로드
  onMounted(() => {
    if (TokenManager.hasToken()) {
      refreshUser()
    }
  })

  return {
    user: computed(() => user.value),
    isLoggedIn,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    login,
    logout,
    signup,
    refreshUser,
    clearError: () => { error.value = null }
  }
}
