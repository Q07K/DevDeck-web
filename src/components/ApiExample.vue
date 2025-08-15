<template>
  <div class="api-example p-6">
    <h2 class="text-2xl font-bold mb-6">API 사용 예제</h2>
    
    <!-- 인증 섹션 -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold mb-4">인증</h3>
      <div class="space-y-4">
        <div v-if="!isLoggedIn" class="space-y-2">
          <input 
            v-model="loginForm.email" 
            type="email" 
            placeholder="이메일" 
            class="w-full px-3 py-2 border rounded"
          >
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="비밀번호" 
            class="w-full px-3 py-2 border rounded"
          >
          <button 
            @click="handleLogin" 
            :disabled="authLoading"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {{ authLoading ? '로그인 중...' : '로그인' }}
          </button>
        </div>
        <div v-else class="space-y-2">
          <p class="text-green-600">안녕하세요, {{ user?.nickname }}님!</p>
          <button 
            @click="handleLogout" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
        <p v-if="authError" class="text-red-500">{{ authError }}</p>
      </div>
    </section>

    <!-- 게시글 목록 섹션 -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold mb-4">게시글 목록</h3>
      <div class="space-y-4">
        <div class="flex space-x-2">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="검색어" 
            class="flex-1 px-3 py-2 border rounded"
          >
          <button 
            @click="handleSearch" 
            :disabled="postsLoading"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            검색
          </button>
          <button 
            @click="handleFetchPosts" 
            :disabled="postsLoading"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {{ postsLoading ? '로딩...' : '새로고침' }}
          </button>
        </div>
        
        <div v-if="postsError" class="text-red-500">{{ postsError }}</div>
        
        <div v-if="posts" class="space-y-2">
          <div v-for="post in posts.posts" :key="post.id" class="p-4 border rounded">
            <h4 class="font-semibold">{{ post.title }}</h4>
            <p class="text-gray-600 text-sm">{{ post.summary }}</p>
            <div class="flex justify-between text-sm text-gray-500 mt-2">
              <span>by {{ post.author.nickname }}</span>
              <span>❤️ {{ post.likeCount }} 💬 {{ post.commentCount }}</span>
            </div>
          </div>
          
          <!-- 페이지네이션 -->
          <div v-if="posts.totalPages > 1" class="flex justify-center space-x-2 mt-4">
            <button 
              v-for="page in posts.totalPages" 
              :key="page"
              @click="handlePageChange(page)"
              :class="{
                'bg-blue-500 text-white': page === posts.currentPage,
                'bg-gray-200 text-gray-700': page !== posts.currentPage
              }"
              class="px-3 py-1 rounded"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 게시글 작성 섹션 (로그인 시에만) -->
    <section v-if="isLoggedIn" class="mb-8">
      <h3 class="text-xl font-semibold mb-4">게시글 작성</h3>
      <div class="space-y-4">
        <input 
          v-model="newPost.title" 
          type="text" 
          placeholder="제목" 
          class="w-full px-3 py-2 border rounded"
        >
        <textarea 
          v-model="newPost.content" 
          placeholder="내용" 
          rows="4"
          class="w-full px-3 py-2 border rounded"
        ></textarea>
        <input 
          v-model="newPost.tagsInput" 
          type="text" 
          placeholder="태그 (쉼표로 구분)" 
          class="w-full px-3 py-2 border rounded"
        >
        <button 
          @click="handleCreatePost" 
          :disabled="editorLoading"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {{ editorLoading ? '작성 중...' : '게시글 작성' }}
        </button>
        <p v-if="editorError" class="text-red-500">{{ editorError }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth, usePosts, usePostEditor } from '../composables'

// 인증 관련
const { user, isLoggedIn, isLoading: authLoading, error: authError, login, logout } = useAuth()

const loginForm = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  await login(loginForm.email, loginForm.password)
}

const handleLogout = async () => {
  await logout()
}

// 게시글 목록 관련
const { posts, isLoading: postsLoading, error: postsError, fetchPosts, searchPosts, changePage } = usePosts()
const searchQuery = ref('')

const handleFetchPosts = () => {
  fetchPosts()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    searchPosts(searchQuery.value)
  } else {
    fetchPosts()
  }
}

const handlePageChange = (page: number) => {
  if (searchQuery.value.trim()) {
    searchPosts(searchQuery.value, page)
  } else {
    changePage(page)
  }
}

// 게시글 작성 관련
const { isLoading: editorLoading, error: editorError, createPost } = usePostEditor()

const newPost = reactive({
  title: '',
  content: '',
  tagsInput: ''
})

const handleCreatePost = async () => {
  const tags = newPost.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  const result = await createPost({
    title: newPost.title,
    content: newPost.content,
    tags
  })
  
  if (result) {
    // 작성 성공 시 폼 초기화
    newPost.title = ''
    newPost.content = ''
    newPost.tagsInput = ''
    
    // 게시글 목록 새로고침
    fetchPosts()
  }
}

// 컴포넌트 마운트 시 게시글 목록 가져오기
handleFetchPosts()
</script>
