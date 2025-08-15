<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="!post || !author">
      <p>게시글을 찾을 수 없습니다.</p>
    </div>
    
    <div v-else-if="post && author">
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
        <h3 class="text-2xl font-bold mb-4">{{ post.commentCount }}개의 댓글</h3>
        
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
        
        <div>
          <template v-for="comment in rootComments" :key="comment.id">
            <CommentItem :comment="comment" :author="getAuthor(comment.authorId)" />
            
            <template v-for="reply in getReplies(comment.id)" :key="reply.id">
              <CommentItem :comment="reply" :author="getAuthor(reply.authorId)" />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { Heart } from 'lucide-vue-next'
import CommentItem from '@/components/CommentItem.vue'
import { mockPosts, mockUsers } from '@/data/mock'

const route = useRoute()
const postId = Number(route.params.id)

const post = computed(() => {
  const found = mockPosts.find(p => p.id === postId)
  return found || null
})

const author = computed(() => {
  if (!post.value) return null
  return mockUsers[post.value.authorId] || null
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
  return mockUsers[authorId]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>
