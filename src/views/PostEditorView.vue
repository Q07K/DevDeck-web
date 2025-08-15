<template>
  <div class="max-w-6xl mx-auto">
    <!-- 에러 메시지 -->
    <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
      {{ error }}
    </div>
    
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
        <button 
          @click="saveDraft"
          :disabled="isLoading"
          class="px-6 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          임시저장
        </button>
        <button 
          @click="publishPost"
          :disabled="isLoading || !canPublish"
          class="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ isLoading ? '발행 중...' : '글 발행' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { useRouter } from 'vue-router'
import { usePostEditor } from '../composables/usePosts'
import type { PostCreateRequest } from '../types/api'

const router = useRouter()
const { createPost, isLoading, error } = usePostEditor()

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

// 발행 가능 여부 체크
const canPublish = computed(() => {
  return title.value.trim().length > 0 && markdownContent.value.trim().length > 0
})

// 태그 배열로 변환
const parseTags = (tagString: string): string[] => {
  return tagString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

// 글 발행
const publishPost = async () => {
  if (!canPublish.value) return

  const postData: PostCreateRequest = {
    title: title.value.trim(),
    content: markdownContent.value.trim(),
    tags: parseTags(tags.value)
  }

  const result = await createPost(postData)
  if (result) {
    // 성공 시 글 상세 페이지로 이동
    router.push(`/posts/${result.id}`)
  }
}

// 임시저장 (로컬스토리지 활용)
const saveDraft = () => {
  const draftData = {
    title: title.value,
    tags: tags.value,
    content: markdownContent.value,
    savedAt: new Date().toISOString()
  }
  
  localStorage.setItem('post_draft', JSON.stringify(draftData))
  alert('임시저장되었습니다.')
}

// 컴포넌트 마운트 시 임시저장된 데이터 복원
const loadDraft = () => {
  const draftData = localStorage.getItem('post_draft')
  if (draftData) {
    try {
      const draft = JSON.parse(draftData)
      if (confirm('임시저장된 글이 있습니다. 불러오시겠습니까?')) {
        title.value = draft.title || ''
        tags.value = draft.tags || ''
        markdownContent.value = draft.content || ''
        // 불러온 후 임시저장 데이터 삭제
        localStorage.removeItem('post_draft')
      }
    } catch (e) {
      console.error('임시저장 데이터 로드 실패:', e)
    }
  }
}

// 컴포넌트 마운트 시 실행
loadDraft()
</script>
