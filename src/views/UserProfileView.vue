<template>
  <div class="max-w-5xl mx-auto">
    <div v-if="!user">
      <p>사용자를 찾을 수 없습니다.</p>
    </div>
    
    <div v-else>
      <div class="flex flex-col items-center md:flex-row md:items-start p-8 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
        <img 
          :src="`https://placehold.co/128x128/6366f1/ffffff?text=${user.nickname.charAt(0)}`" 
          :alt="user.nickname" 
          class="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
        >
        
        <div>
          <h1 class="text-4xl font-bold text-center md:text-left">{{ user.nickname }}</h1>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-1 text-center md:text-left">
            {{ user.email }}
          </p>
          <p class="mt-4 text-center md:text-left">
            기술과 코딩에 대한 모든 것을 사랑하는 개발자입니다. 지식을 공유하고 함께 성장하는 것을 즐깁니다.
          </p>
        </div>
      </div>

      <h2 class="text-3xl font-bold mb-6">작성한 글</h2>
      
      <div class="space-y-6">
        <PostCard 
          v-for="post in userPosts" 
          :key="post.id" 
          :post="post" 
          :author="user"
        />
        
        <p v-if="userPosts.length === 0">아직 작성한 글이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import { mockPosts, mockUsers } from '@/data/mock'

const route = useRoute()
const userId = Number(route.params.id)

const user = computed(() => {
  return mockUsers[userId]
})

const userPosts = computed(() => {
  return mockPosts.filter(p => p.authorId === userId)
})
</script>
