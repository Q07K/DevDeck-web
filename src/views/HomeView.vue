<template>
  <div>
    <h1>Debug: HomeView is loading</h1>
    <p>Posts count: {{ posts.length }}</p>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Main Content -->
      <div class="w-full md:w-3/4">
        <div class="flex justify-between items-center mb-6">
        <div class="flex space-x-2">
          <button class="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 font-semibold">
            최신순
          </button>
          <button class="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            인기순
          </button>
        </div>
        
        <div class="relative w-full max-w-xs">
          <input 
            type="text" 
            placeholder="검색..." 
            class="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <div class="space-y-6">
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post" 
          :author="getAuthor(post.authorId)"
        />
      </div>
    </div>
    
    <!-- Sidebar -->
    <aside class="w-full md:w-1/4">
      <div class="sticky top-24">
        <h3 class="text-lg font-bold mb-4">태그</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tag in allTags" 
            :key="tag"
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
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
import { computed, onMounted } from 'vue'
import { Search } from 'lucide-vue-next'
import PostCard from '@/components/PostCard.vue'
import { mockPosts, mockUsers } from '@/data/mock'

const posts = mockPosts

onMounted(() => {
  console.log('HomeView mounted')
  console.log('Posts:', posts)
  console.log('Users:', mockUsers)
})

const allTags = computed(() => {
  return [...new Set(posts.flatMap(p => p.tags))]
})

const getAuthor = (authorId: number) => {
  return mockUsers[authorId]
}
</script>
