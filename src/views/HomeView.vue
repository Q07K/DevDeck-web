<template>
  <div>
    <!-- API 연동 상태 -->
    <div class="mb-8 p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
      <h2 class="text-lg font-bold mb-2 text-green-800 dark:text-green-200"> API 연동 완료</h2>
      <p class="text-sm text-green-600 dark:text-green-300 mb-4">
        백엔드 API를 통해 실제 데이터베이스에서 게시글을 불러옵니다.
      </p>
      <div class="flex space-x-2">
        <router-link 
          to="/login" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          로그인
        </router-link>
        <router-link 
          to="/signup" 
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          회원가입
        </router-link>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- 메인 컨텐츠 -->
      <div class="w-full md:w-3/4">
        <!-- 정렬 및 검색 -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex space-x-2">
            <button 
              @click="changeSortOrder('latest')"
              :class="{
                'bg-indigo-600 text-white': currentSort === 'latest',
                'bg-gray-200 dark:bg-gray-700': currentSort !== 'latest'
              }"
              class="px-4 py-2 rounded-md font-semibold transition-colors"
            >
              최신순
            </button>
            <button 
              @click="changeSortOrder('popular')"
              :class="{
                'bg-indigo-600 text-white': currentSort === 'popular',
                'bg-gray-200 dark:bg-gray-700': currentSort !== 'popular'
              }"
              class="px-4 py-2 rounded-md font-semibold transition-colors"
            >
              인기순
            </button>
          </div>
          
          <div class="relative w-full max-w-xs">
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="검색..." 
              class="w-full pl-10 pr-16 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
            >
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button 
              @click="handleSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              검색
            </button>
          </div>
        </div>
        
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="mt-2 text-gray-600 dark:text-gray-400">게시글을 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button 
            @click="retry"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            다시 시도
          </button>
        </div>

        <!-- 게시글 목록 -->
        <div v-else>
          <div v-if="postList.length === 0" class="text-center py-8">
            <p class="text-gray-600 dark:text-gray-400">게시글이 없습니다.</p>
          </div>
          
          <div v-else class="space-y-6">
            <PostCard 
              v-for="post in postList" 
              :key="post.id" 
              :post="post"
            />
            
            <!-- 페이지네이션 -->
            <div v-if="posts && posts.totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
              <button 
                @click="changePage(posts.currentPage - 1)"
                :disabled="posts.currentPage <= 1"
                class="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              <span class="px-4 py-2 text-gray-600 dark:text-gray-400">
                {{ posts.currentPage }} / {{ posts.totalPages }}
              </span>
              
              <button 
                @click="changePage(posts.currentPage + 1)"
                :disabled="posts.currentPage >= posts.totalPages"
                class="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 사이드바 -->
      <aside class="w-full md:w-1/4">
        <div class="sticky top-24">
          <h3 class="text-lg font-bold mb-4">태그</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in allTags" 
              :key="tag"
              @click="handleTagClick(tag)"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import PostCard from '@/components/PostCard.vue'
import { usePosts } from '@/composables/usePosts'

// 상태 관리
const currentSort = ref<'latest' | 'popular'>('latest')
const searchQuery = ref('')

// Posts composable
const { posts, isLoading, error, fetchPosts, searchPosts, fetchPostsByTag, changePage } = usePosts()

// 컴포넌트 마운트시 초기 데이터 로드
onMounted(async () => {
  console.log('HomeView mounted - API 연동 시작')
  await fetchPosts({ sort: currentSort.value })
})

// 게시글 목록 계산 속성
const postList = computed(() => {
  return posts.value?.posts || []
})

// 태그 목록 계산 속성
const allTags = computed(() => {
  const tags = postList.value.flatMap(p => p.tags || [])
  return [...new Set(tags)]
})

// 정렬 순서 변경
const changeSortOrder = async (sort: 'latest' | 'popular') => {
  currentSort.value = sort
  await fetchPosts({ sort })
}

// 검색 실행
const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    await searchPosts(searchQuery.value.trim())
  } else {
    await fetchPosts({ sort: currentSort.value })
  }
}

// 태그 클릭 처리
const handleTagClick = async (tag: string) => {
  await fetchPostsByTag(tag)
}

// 재시도
const retry = async () => {
  await fetchPosts({ sort: currentSort.value })
}
</script>
