import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { TokenManager } from '@/api'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/SignupView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/api-test',
    name: 'ApiTest',
    component: () => import('@/views/ApiTestView.vue')
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('@/views/PostDetailView.vue')
  },
  {
    path: '/new-post',
    name: 'PostEditor',
    component: () => import('@/views/PostEditorView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfileView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 라우트 가드 - 인증이 필요한 페이지와 게스트만 접근 가능한 페이지 처리
router.beforeEach((to) => {
  const isLoggedIn = TokenManager.hasToken()
  
  // 인증이 필요한 페이지인데 로그인하지 않은 경우
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'Login' }
  }
  
  // 게스트만 접근 가능한 페이지인데 이미 로그인한 경우
  if (to.meta.requiresGuest && isLoggedIn) {
    return { name: 'Home' }
  }
  
  return true
})

export default router
