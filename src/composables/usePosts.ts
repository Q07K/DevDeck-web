import { ref, computed } from 'vue'
import { api } from '../api'
import type { 
  PostListResponse, 
  PostDetailResponse, 
  PostsQueryParams,
  PostCreateRequest,
  PostUpdateRequest
} from '../api'

/**
 * 게시글 목록 관련 Composable
 */
export function usePosts() {
  const posts = ref<PostListResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 게시글 목록 가져오기
  const fetchPosts = async (params?: PostsQueryParams) => {
    try {
      isLoading.value = true
      error.value = null
      posts.value = await api.post.getPosts(params)
    } catch (err: any) {
      error.value = err.message || '게시글을 불러오는데 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  // 검색
  const searchPosts = async (query: string, page = 1) => {
    await fetchPosts({ query, page })
  }

  // 태그별 조회
  const fetchPostsByTag = async (tag: string, page = 1) => {
    await fetchPosts({ tag, page })
  }

  // 페이지 변경
  const changePage = async (page: number, currentParams?: PostsQueryParams) => {
    await fetchPosts({ ...currentParams, page })
  }

  return {
    posts: computed(() => posts.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchPosts,
    searchPosts,
    fetchPostsByTag,
    changePage,
    clearError: () => { error.value = null }
  }
}

/**
 * 게시글 상세 관련 Composable
 */
export function usePostDetail(postId: number) {
  const post = ref<PostDetailResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 게시글 상세 가져오기
  const fetchPost = async () => {
    try {
      isLoading.value = true
      error.value = null
      post.value = await api.post.getPostDetail(postId)
    } catch (err: any) {
      error.value = err.message || '게시글을 불러오는데 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  // 좋아요 토글
  const toggleLike = async () => {
    if (!post.value) return
    
    try {
      const result = await api.post.toggleLike(postId)
      // 게시글 정보 업데이트
      post.value.likeCount = result.likeCount
    } catch (err: any) {
      error.value = err.message || '좋아요 처리에 실패했습니다.'
    }
  }

  return {
    post: computed(() => post.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchPost,
    toggleLike,
    clearError: () => { error.value = null }
  }
}

/**
 * 게시글 작성/수정 관련 Composable
 */
export function usePostEditor(postId?: number) {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isEditMode = computed(() => !!postId)

  // 게시글 작성
  const createPost = async (postData: PostCreateRequest): Promise<PostDetailResponse | null> => {
    try {
      isLoading.value = true
      error.value = null
      const result = await api.post.createPost(postData)
      return result
    } catch (err: any) {
      error.value = err.message || '게시글 작성에 실패했습니다.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 게시글 수정
  const updatePost = async (postData: PostUpdateRequest): Promise<PostDetailResponse | null> => {
    if (!postId) return null
    
    try {
      isLoading.value = true
      error.value = null
      const result = await api.post.updatePost(postId, postData)
      return result
    } catch (err: any) {
      error.value = err.message || '게시글 수정에 실패했습니다.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 게시글 삭제
  const deletePost = async (): Promise<boolean> => {
    if (!postId) return false
    
    try {
      isLoading.value = true
      error.value = null
      await api.post.deletePost(postId)
      return true
    } catch (err: any) {
      error.value = err.message || '게시글 삭제에 실패했습니다.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    isEditMode,
    createPost,
    updatePost,
    deletePost,
    clearError: () => { error.value = null }
  }
}
