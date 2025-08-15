<template>
  <div :class="`flex space-x-4 ${comment.parentCommentId ? 'ml-10 mt-4' : 'mt-6'}`">
    <img 
      :src="`https://placehold.co/32x32/6366f1/ffffff?text=${author.nickname.charAt(0)}`" 
      :alt="author.nickname" 
      class="w-8 h-8 rounded-full mt-1"
    >
    
    <div class="flex-1">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <p class="font-semibold">{{ author.nickname }}</p>
        <p class="text-gray-800 dark:text-gray-200">{{ comment.content }}</p>
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex space-x-3">
        <span>{{ formatDate(comment.createdAt) }}</span>
        <a href="#" class="font-semibold hover:underline">Reply</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment, User } from '@/types'

interface Props {
  comment: Comment
  author: User
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
