<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col space-y-4">
      <input 
        type="text" 
        placeholder="제목을 입력하세요" 
        class="w-full text-4xl font-bold bg-transparent focus:outline-none p-2"
        v-model="title"
      >
      
      <input 
        type="text" 
        placeholder="태그를 입력하세요 (쉼표로 구분)" 
        class="w-full bg-gray-100 dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        v-model="tags"
      >
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh]">
        <div class="flex flex-col">
          <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-t-md border-b border-gray-300 dark:border-gray-600">
            <span class="font-semibold">Markdown</span>
          </div>
          <textarea 
            v-model="markdownContent"
            class="w-full h-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-md focus:outline-none resize-none font-mono text-sm" 
            spellcheck="false"
          ></textarea>
        </div>
        
        <div class="flex flex-col">
          <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-t-md border-b border-gray-300 dark:border-gray-600">
            <span class="font-semibold">Preview</span>
          </div>
          <div 
            class="w-full h-full p-4 bg-white dark:bg-gray-900 rounded-b-md overflow-y-auto prose dark:prose-dark"
            v-html="renderedContent"
          ></div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button class="px-6 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          임시저장
        </button>
        <button class="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          글 발행
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const title = ref('')
const tags = ref('')
const markdownContent = ref(`## 여기에 마크다운을 입력하세요

- **볼드**
- *이탤릭*
- \`인라인 코드\`

\`\`\`javascript
// 코드 블록
function greet() {
  console.log("Hello, DevDeck!");
}
\`\`\``)

const renderedContent = computed(() => {
  return marked.parse(markdownContent.value)
})
</script>
