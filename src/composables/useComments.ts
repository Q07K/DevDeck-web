import { ref, computed } from 'vue'
import { api } from '../api'
import type { 
  CommentResponse,
  CommentCreateRequest,
  CommentUpdateRequest
} from '../api'

/**
 * 댓글 관련 Composable
 */
export function useComments(postId: number) {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 댓글 작성
  const createComment = async (content: string, parentCommentId?: number): Promise<CommentResponse | null> => {
    try {
      isLoading.value = true
      error.value = null
      
      const commentData: CommentCreateRequest = {
        content,
        parentCommentId
      }
      
      const result = await api.post.createComment(postId, commentData)
      return result
    } catch (err: any) {
      error.value = err.message || '댓글 작성에 실패했습니다.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 댓글 수정
  const updateComment = async (commentId: number, content: string): Promise<CommentResponse | null> => {
    try {
      isLoading.value = true
      error.value = null
      
      const commentData: CommentUpdateRequest = { content }
      const result = await api.post.updateComment(commentId, commentData)
      return result
    } catch (err: any) {
      error.value = err.message || '댓글 수정에 실패했습니다.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 댓글 삭제
  const deleteComment = async (commentId: number): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null
      
      await api.post.deleteComment(commentId)
      return true
    } catch (err: any) {
      error.value = err.message || '댓글 삭제에 실패했습니다.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    createComment,
    updateComment,
    deleteComment,
    clearError: () => { error.value = null }
  }
}
