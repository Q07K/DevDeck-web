<template>
  <header class="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold">
        <span>📱</span>
        <span>DevDeck</span>
      </router-link>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span class="block dark:hidden">☀️</span>
          <span class="hidden dark:block">🌙</span>
        </button>
        
        <router-link 
          to="/new-post"
          class="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <span>➕</span>
          <span>새 글 작성</span>
        </router-link>
        
        <div class="relative">
          <router-link to="/user/1">
            <img 
              src="https://placehold.co/40x40/6366f1/ffffff?text=U" 
              alt="User Avatar" 
              class="w-10 h-10 rounded-full cursor-pointer"
            >
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
</script>
