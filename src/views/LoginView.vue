<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          DevDeck에 로그인
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          또는
          <router-link
            to="/signup"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            새 계정을 만드세요
          </router-link>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              이메일 주소
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="loginForm.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
                :class="{ 'border-red-500 dark:border-red-400': fieldErrors.email }"
                placeholder="이메일을 입력하세요"
              />
              <p v-if="fieldErrors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ fieldErrors.email }}
              </p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              비밀번호
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="loginForm.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
                :class="{ 'border-red-500 dark:border-red-400': fieldErrors.password }"
                placeholder="비밀번호를 입력하세요"
              />
              <p v-if="fieldErrors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ fieldErrors.password }}
              </p>
            </div>
          </div>

          <!-- 전체 에러 메시지 -->
          <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 dark:text-red-400">
                  로그인 실패
                </h3>
                <p class="mt-1 text-sm text-red-700 dark:text-red-300">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? '로그인 중...' : '로그인' }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?
              <router-link
                to="/signup"
                class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                회원가입
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'

const router = useRouter()
const { login, isLoading, error, clearError } = useAuth()

// 폼 데이터
const loginForm = reactive({
  email: '',
  password: ''
})

// 필드별 에러
const fieldErrors = reactive({
  email: '',
  password: ''
})

// 폼 유효성 검사
const isFormValid = computed(() => {
  return loginForm.email.length > 0 && 
         loginForm.password.length > 0 &&
         isValidEmail(loginForm.email)
})

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 실시간 유효성 검사
const validateField = (field: 'email' | 'password') => {
  fieldErrors[field] = ''
  
  if (field === 'email') {
    if (loginForm.email && !isValidEmail(loginForm.email)) {
      fieldErrors.email = '올바른 이메일 형식을 입력해주세요'
    }
  }
  
  if (field === 'password') {
    if (loginForm.password && loginForm.password.length < 6) {
      fieldErrors.password = '비밀번호는 최소 6자 이상이어야 합니다'
    }
  }
}

// 로그인 처리
const handleLogin = async () => {
  // 에러 초기화
  clearError()
  fieldErrors.email = ''
  fieldErrors.password = ''
  
  // 최종 유효성 검사
  validateField('email')
  validateField('password')
  
  if (fieldErrors.email || fieldErrors.password) {
    return
  }
  
  try {
    const success = await login(loginForm.email, loginForm.password)
    
    if (success) {
      // 로그인 성공 시 홈으로 이동
      router.push('/')
    }
  } catch (err) {
    console.error('로그인 에러:', err)
  }
}

// 실시간 유효성 검사 이벤트 바인딩
const handleEmailBlur = () => validateField('email')
const handlePasswordBlur = () => validateField('password')
</script>
