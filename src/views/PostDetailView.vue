<template>
  <div class="max-w-4xl mx-auto">
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">게시글을 불러오는 중...</p>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
      <button 
        @click="fetchPostDetail"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        다시 시도
      </button>
    </div>

    <!-- 게시글이 없을 때 -->
    <div v-else-if="!post" class="text-center py-8">
      <p class="text-gray-600 dark:text-gray-400">게시글을 찾을 수 없습니다.</p>
    </div>
    
    <!-- 게시글 내용 -->
    <div v-else>
      <!-- Post Header -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">{{ post.title }}</h1>
        <div class="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <div 
            class="flex items-center space-x-2 cursor-pointer" 
            @click="$router.push(`/user/${author.id}`)"
          >
            <img 
              :src="`https://placehold.co/40x40/6366f1/ffffff?text=${author.nickname.charAt(0)}`" 
              :alt="author.nickname" 
              class="w-10 h-10 rounded-full"
            >
            <span class="font-semibold">{{ author.nickname }}</span>
          </div>
          <span>&middot;</span>
          <span>{{ formatDate(post.createdAt) }}</span>
          <span>&middot;</span>
          <span>조회수 {{ post.viewCount }}</span>
        </div>
        
        <div class="mt-4 flex flex-wrap gap-2">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Post Content -->
      <article 
        class="prose prose-lg dark:prose-dark max-w-none mb-12"
        v-html="renderedContent"
      ></article>

      <!-- Action Buttons -->
      <div class="flex items-center justify-center space-x-4 mb-12">
        <button class="flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Heart class="w-6 h-6" />
          <span class="text-lg font-semibold">{{ post.likeCount }}</span>
        </button>
      </div>

      <!-- Comments Section -->
      <div>
        <h3 class="text-2xl font-bold mb-4">{{ post.comments?.length || 0 }}개의 댓글</h3>
        
        <div class="mb-6">
          <textarea 
            placeholder="댓글을 입력하세요..." 
            class="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            rows="3"
          ></textarea>
          <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            댓글 작성
          </button>
        </div>
        
        <div v-if="post.comments && post.comments.length > 0">
          <template v-for="comment in rootComments" :key="comment.id">
            <CommentItem :comment="comment" :author="comment.author" />
            
            <template v-for="reply in getReplies(comment.id)" :key="reply.id">
              <CommentItem :comment="reply" :author="reply.author" />
            </template>
          </template>
        </div>
        <div v-else class="text-gray-500 dark:text-gray-400 text-center py-4">
          아직 댓글이 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { Heart } from 'lucide-vue-next'
import CommentItem from '@/components/CommentItem.vue'
import { api } from '@/api'
import type { PostDetailResponse } from '@/types/api'

const route = useRoute()
const postId = Number(route.params.id)

// 반응형 상태
const post = ref<PostDetailResponse | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// 게시글 상세 정보 가져오기
const fetchPostDetail = async () => {
  try {
    isLoading.value = true
    error.value = null
    console.log(`PostDetailView: Fetching post ${postId}`)
    post.value = await api.post.getPostDetail(postId)
    console.log('PostDetailView: Post loaded successfully', post.value)
  } catch (err: any) {
    console.error('PostDetailView: Failed to fetch post', err)
    error.value = err.message || '게시글을 불러오는데 실패했습니다.'
    post.value = null
  } finally {
    isLoading.value = false
  }
}

// 컴포넌트 마운트시 데이터 로드
onMounted(() => {
  console.log('PostDetailView mounted, postId:', postId)
  fetchPostDetail()
})

// 작성자 정보
const author = computed(() => {
  return post.value?.author || null
})

const renderedContent = computed(() => {
  return post.value ? marked.parse(post.value.content) : ''
})

const rootComments = computed(() => {
  return post.value ? post.value.comments.filter(c => c.parentCommentId === null) : []
})

const getReplies = (commentId: number) => {
  return post.value ? post.value.comments.filter(c => c.parentCommentId === commentId) : []
}

const getAuthor = (authorId: number) => {
  // 댓글 작성자 정보는 댓글 객체에 포함되어 있음
  const comment = post.value?.comments.find(c => c.author.id === authorId)
  return comment?.author || null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>
