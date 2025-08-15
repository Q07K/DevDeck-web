<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          DevDeck 회원가입
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?
          <router-link
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            로그인하세요
          </router-link>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <!-- 이메일 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              이메일 주소
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="signupForm.email"
                @blur="validateField('email')"
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

          <!-- 닉네임 -->
          <div>
            <label for="nickname" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              닉네임
            </label>
            <div class="mt-1">
              <input
                id="nickname"
                v-model="signupForm.nickname"
                @blur="validateField('nickname')"
                name="nickname"
                type="text"
                autocomplete="username"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
                :class="{ 'border-red-500 dark:border-red-400': fieldErrors.nickname }"
                placeholder="닉네임을 입력하세요"
              />
              <p v-if="fieldErrors.nickname" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ fieldErrors.nickname }}
              </p>
            </div>
          </div>

          <!-- 비밀번호 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              비밀번호
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="signupForm.password"
                @blur="validateField('password')"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
                :class="{ 'border-red-500 dark:border-red-400': fieldErrors.password }"
                placeholder="비밀번호를 입력하세요"
              />
              <p v-if="fieldErrors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ fieldErrors.password }}
              </p>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                최소 8자 이상, 영문과 숫자를 포함해야 합니다.
              </p>
            </div>
          </div>

          <!-- 비밀번호 확인 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              비밀번호 확인
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="signupForm.confirmPassword"
                @blur="validateField('confirmPassword')"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
                :class="{ 'border-red-500 dark:border-red-400': fieldErrors.confirmPassword }"
                placeholder="비밀번호를 다시 입력하세요"
              />
              <p v-if="fieldErrors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ fieldErrors.confirmPassword }}
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
                  회원가입 실패
                </h3>
                <p class="mt-1 text-sm text-red-700 dark:text-red-300">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>

          <!-- 성공 메시지 -->
          <div v-if="successMessage" class="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800 dark:text-green-400">
                  회원가입 성공!
                </h3>
                <p class="mt-1 text-sm text-green-700 dark:text-green-300">
                  {{ successMessage }}
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
              {{ isLoading ? '회원가입 중...' : '회원가입' }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              이미 계정이 있으신가요?
              <router-link
                to="/login"
                class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                로그인
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
const { signup, isLoading, error, clearError } = useAuth()

// 폼 데이터
const signupForm = reactive({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

// 필드별 에러
const fieldErrors = reactive({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

// 성공 메시지
const successMessage = ref('')

// 폼 유효성 검사
const isFormValid = computed(() => {
  return signupForm.email.length > 0 && 
         signupForm.nickname.length > 0 &&
         signupForm.password.length > 0 &&
         signupForm.confirmPassword.length > 0 &&
         isValidEmail(signupForm.email) &&
         isValidPassword(signupForm.password) &&
         signupForm.password === signupForm.confirmPassword &&
         !Object.values(fieldErrors).some(error => error.length > 0)
})

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 비밀번호 유효성 검사 (8자 이상, 영문+숫자)
const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// 실시간 유효성 검사
const validateField = (field: 'email' | 'nickname' | 'password' | 'confirmPassword') => {
  fieldErrors[field] = ''
  
  switch (field) {
    case 'email':
      if (signupForm.email && !isValidEmail(signupForm.email)) {
        fieldErrors.email = '올바른 이메일 형식을 입력해주세요'
      }
      break
      
    case 'nickname':
      if (signupForm.nickname && signupForm.nickname.length < 2) {
        fieldErrors.nickname = '닉네임은 최소 2자 이상이어야 합니다'
      } else if (signupForm.nickname && signupForm.nickname.length > 20) {
        fieldErrors.nickname = '닉네임은 최대 20자까지 가능합니다'
      }
      break
      
    case 'password':
      if (signupForm.password && !isValidPassword(signupForm.password)) {
        fieldErrors.password = '비밀번호는 8자 이상이며, 영문과 숫자를 포함해야 합니다'
      }
      // 비밀번호가 변경되면 확인 비밀번호도 다시 검사
      if (signupForm.confirmPassword) {
        validateField('confirmPassword')
      }
      break
      
    case 'confirmPassword':
      if (signupForm.confirmPassword && signupForm.password !== signupForm.confirmPassword) {
        fieldErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
      }
      break
  }
}

// 회원가입 처리
const handleSignup = async () => {
  // 에러 및 성공 메시지 초기화
  clearError()
  successMessage.value = ''
  Object.keys(fieldErrors).forEach(key => {
    fieldErrors[key as keyof typeof fieldErrors] = ''
  })
  
  // 전체 필드 유효성 검사
  validateField('email')
  validateField('nickname')
  validateField('password')
  validateField('confirmPassword')
  
  if (Object.values(fieldErrors).some(error => error.length > 0)) {
    return
  }
  
  try {
    await signup(signupForm.email, signupForm.password, signupForm.nickname)
    
    // 회원가입 성공
    successMessage.value = '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.'
    
    // 2초 후 로그인 페이지로 이동
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (err) {
    console.error('회원가입 에러:', err)
  }
}
</script>
