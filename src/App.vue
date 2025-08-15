<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- 토스트 알림 -->
    <div 
      v-if="showToast"
      class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-300"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAuth } from '@/composables'

const router = useRouter()
const { logout } = useAuth()

// 토스트 알림 상태
const showToast = ref(false)
const toastMessage = ref('')

// 토스트 표시 함수
const showToastMessage = (message: string, duration = 3000) => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, duration)
}

// 인증 에러 처리
const handleAuthError = async () => {
  await logout()
  showToastMessage('세션이 만료되었습니다. 다시 로그인해주세요.')
  router.push('/login')
}

// 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener('auth-error', handleAuthError)
})

onUnmounted(() => {
  window.removeEventListener('auth-error', handleAuthError)
})
</script>
