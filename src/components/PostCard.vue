<template>
  <div 
    class="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" 
    @click="$router.push(`/post/${post.id}`)"
  >
    <div class="p-6">
      <div class="flex items-center space-x-3 mb-4">
        <img 
          :src="`https://placehold.co/40x40/6366f1/ffffff?text=${author.nickname.charAt(0)}`" 
          :alt="author.nickname" 
          class="w-10 h-10 rounded-full"
        >
        <div>
          <p class="font-semibold">{{ author.nickname }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.createdAt) }}</p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4">{{ post.summary }}</p>
      
      <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
        <div class="flex space-x-4">
          <span class="flex items-center space-x-1">
            <Heart class="w-4 h-4" />
            <span>{{ post.likeCount }}</span>
          </span>
          <span class="flex items-center space-x-1">
            <MessageSquare class="w-4 h-4" />
            <span>{{ post.commentCount }}</span>
          </span>
        </div>
        
        <div class="flex space-x-2">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, MessageSquare } from 'lucide-vue-next'
import type { Post, User } from '@/types'

interface Props {
  post: Post
  author: User
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>
