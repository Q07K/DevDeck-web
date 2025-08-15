<template>
  <div class="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <h1 class="text-3xl font-bold mb-6">API 연결 테스트</h1>
    
    <!-- API 상태 표시 -->
    <div class="mb-6 p-4 rounded-lg" :class="apiStatusClass">
      <h2 class="font-semibold mb-2">API 서버 상태</h2>
      <p>{{ apiStatusMessage }}</p>
      <button 
        @click="checkApiHealth"
        :disabled="isCheckingHealth"
        class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isCheckingHealth ? '확인 중...' : '상태 확인' }}
      </button>
    </div>

    <!-- 인증 테스트 -->
    <div class="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <h2 class="text-xl font-semibold mb-4">🔐 인증 테스트</h2>
      
      <div v-if="!isLoggedIn" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">테스트 계정 로그인</h3>
            <div class="space-y-2">
              <input 
                v-model="testLogin.email"
                type="email" 
                placeholder="이메일" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
              >
              <input 
                v-model="testLogin.password"
                type="password" 
                placeholder="비밀번호" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
              >
              <button 
                @click="testLoginAPI"
                :disabled="authLoading"
                class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {{ authLoading ? '로그인 중...' : '로그인 테스트' }}
              </button>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">회원가입 테스트</h3>
            <div class="space-y-2">
              <input 
                v-model="testSignup.email"
                type="email" 
                placeholder="이메일" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
              >
              <input 
                v-model="testSignup.nickname"
                type="text" 
                placeholder="닉네임" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
              >
              <input 
                v-model="testSignup.password"
                type="password" 
                placeholder="비밀번호" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors duration-300"
              >
              <button 
                @click="testSignupAPI"
                :disabled="authLoading"
                class="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {{ authLoading ? '가입 중...' : '회원가입 테스트' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 class="font-semibold text-green-800">✅ 로그인 성공!</h3>
          <p class="text-green-700">사용자: {{ user?.nickname }} ({{ user?.email }})</p>
        </div>
        
        <div class="space-y-2">
          <button 
            @click="testGetProfile"
            :disabled="profileLoading"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {{ profileLoading ? '조회 중...' : '프로필 조회' }}
          </button>
          
          <button 
            @click="handleLogout"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
          >
            로그아웃
          </button>
        </div>
      </div>
      
      <!-- 인증 에러 -->
      <div v-if="authError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700">❌ {{ authError }}</p>
      </div>
    </div>

    <!-- 게시글 API 테스트 -->
    <div class="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <h2 class="text-xl font-semibold mb-4">📝 게시글 API 테스트</h2>
      
      <div class="space-y-4">
        <button 
          @click="testGetPosts"
          :disabled="postsLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ postsLoading ? '조회 중...' : '게시글 목록 조회' }}
        </button>
        
        <div v-if="postsError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700">❌ {{ postsError }}</p>
        </div>
        
        <div v-if="posts" class="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700">✅ 게시글 {{ posts.posts?.length || 0 }}개 조회 성공</p>
          <pre class="text-xs mt-2 overflow-x-auto">{{ JSON.stringify(posts, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- API 응답 로그 -->
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <h2 class="text-xl font-semibold mb-4">📊 API 응답 로그</h2>
      
      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div 
          v-for="(log, index) in apiLogs" 
          :key="index"
          class="p-2 text-sm border rounded transition-colors duration-300"
          :class="log.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'"
        >
          <div class="font-mono text-xs text-gray-500 dark:text-gray-400">{{ log.timestamp }}</div>
          <div class="font-semibold">{{ log.method }} {{ log.url }}</div>
          <div>{{ log.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuth, usePosts } from '@/composables'
import { api } from '@/api'

// 인증 관련
const { user, isLoggedIn, isLoading: authLoading, error: authError, login, logout, signup } = useAuth()
const { posts, isLoading: postsLoading, error: postsError, fetchPosts } = usePosts()

// API 상태
const apiStatus = ref<'unknown' | 'online' | 'offline'>('unknown')
const isCheckingHealth = ref(false)

// 테스트 데이터
const testLogin = reactive({
  email: 'test@example.com',
  password: 'test123456'
})

const testSignup = reactive({
  email: 'newuser@example.com',
  nickname: 'TestUser',
  password: 'test123456'
})

// 프로필 조회 상태
const profileLoading = ref(false)

// API 로그
const apiLogs = ref<Array<{
  timestamp: string
  method: string
  url: string
  message: string
  type: 'success' | 'error'
}>>([])

// API 상태 계산
const apiStatusClass = computed(() => {
  switch (apiStatus.value) {
    case 'online':
      return 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
    case 'offline':
      return 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
    default:
      return 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
  }
})

const apiStatusMessage = computed(() => {
  switch (apiStatus.value) {
    case 'online':
      return '✅ API 서버가 정상적으로 작동 중입니다'
    case 'offline':
      return '❌ API 서버에 연결할 수 없습니다'
    default:
      return '❓ API 서버 상태를 확인해주세요'
  }
})

// 로그 추가 함수
const addLog = (method: string, url: string, message: string, type: 'success' | 'error' = 'success') => {
  apiLogs.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    method,
    url,
    message,
    type
  })
  
  // 최대 50개 로그만 유지
  if (apiLogs.value.length > 50) {
    apiLogs.value = apiLogs.value.slice(0, 50)
  }
}

// API 헬스 체크
const checkApiHealth = async () => {
  isCheckingHealth.value = true
  try {
    await api.common.healthCheck()
    apiStatus.value = 'online'
    addLog('GET', '/health', '헬스 체크 성공')
  } catch (error: any) {
    apiStatus.value = 'offline'
    addLog('GET', '/health', `헬스 체크 실패: ${error.message}`, 'error')
  } finally {
    isCheckingHealth.value = false
  }
}

// 로그인 테스트
const testLoginAPI = async () => {
  try {
    const success = await login(testLogin.email, testLogin.password)
    if (success) {
      addLog('POST', '/api/v1/auth/login', '로그인 성공')
    }
  } catch (error: any) {
    addLog('POST', '/api/v1/auth/login', `로그인 실패: ${error.message}`, 'error')
  }
}

// 회원가입 테스트
const testSignupAPI = async () => {
  try {
    await signup(testSignup.email, testSignup.password, testSignup.nickname)
    addLog('POST', '/api/v1/users/signup', '회원가입 성공')
  } catch (error: any) {
    addLog('POST', '/api/v1/users/signup', `회원가입 실패: ${error.message}`, 'error')
  }
}

// 프로필 조회 테스트
const testGetProfile = async () => {
  profileLoading.value = true
  try {
    const profile = await api.user.getMyProfile()
    addLog('GET', '/api/v1/me', `프로필 조회 성공: ${profile.nickname}`)
  } catch (error: any) {
    addLog('GET', '/api/v1/me', `프로필 조회 실패: ${error.message}`, 'error')
  } finally {
    profileLoading.value = false
  }
}

// 게시글 목록 테스트
const testGetPosts = async () => {
  try {
    await fetchPosts({ page: 1, limit: 5 })
    addLog('GET', '/api/v1/posts', '게시글 목록 조회 성공')
  } catch (error: any) {
    addLog('GET', '/api/v1/posts', `게시글 목록 조회 실패: ${error.message}`, 'error')
  }
}

// 로그아웃
const handleLogout = async () => {
  await logout()
  addLog('POST', '/api/v1/auth/logout', '로그아웃')
}
</script>
