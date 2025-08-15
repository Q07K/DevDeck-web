<template>
  <header class="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold">
        <span>DevDeck</span>
      </router-link>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span class="block dark:hidden">☀️</span>
          <span class="hidden dark:block">🌙</span>
        </button>
        
        <!-- 로그인한 경우 -->
        <!-- 임시로 항상 표시 -->
        <router-link 
          to="/new-post"
          class="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <span>➕</span>
          <span>새 글 작성</span>
        </router-link>
        
        <template v-if="isLoggedIn">
          
          <!-- 사용자 드롭다운 -->
          <div class="relative" ref="userMenuRef">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <img 
                :src="userAvatar" 
                :alt="user?.nickname || 'User Avatar'" 
                class="w-8 h-8 rounded-full"
              >
              <span class="hidden md:block text-sm font-medium">{{ user?.nickname }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- 드롭다운 메뉴 -->
            <div 
              v-show="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700"
            >
              <router-link 
                :to="`/user/${user?.id}`"
                @click="closeUserMenu"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                프로필
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        </template>
        
        <!-- 로그인하지 않은 경우 -->
        <template v-else>
          <router-link 
            to="/login"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            로그인
          </router-link>
          <router-link 
            to="/signup"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            회원가입
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'

const router = useRouter()
const { user, isLoggedIn, logout } = useAuth()

// 사용자 메뉴 상태
const showUserMenu = ref(false)
const userMenuRef = ref<HTMLElement>()

// 사용자 아바타 (기본 플레이스홀더)
const userAvatar = computed(() => {
  if (user.value?.nickname) {
    const initial = user.value.nickname.charAt(0).toUpperCase()
    return `https://placehold.co/32x32/6366f1/ffffff?text=${initial}`
  }
  return 'https://placehold.co/32x32/6366f1/ffffff?text=U'
})

// 다크모드 토글
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  // 로컬 스토리지에 테마 상태 저장
  const isDark = document.documentElement.classList.contains('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

// 사용자 메뉴 토글
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 사용자 메뉴 닫기
const closeUserMenu = () => {
  showUserMenu.value = false
}

// 로그아웃 처리
const handleLogout = async () => {
  await logout()
  closeUserMenu()
  router.push('/')
}

// 외부 클릭 시 메뉴 닫기
const handleClickOutside = (event: Event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    closeUserMenu()
  }
}

// 테마 초기화
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
  
  // 외부 클릭 이벤트 리스너 추가
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 이벤트 리스너 제거
  document.removeEventListener('click', handleClickOutside)
})
</script>
