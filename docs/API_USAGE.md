# DevDeck API 클라이언트 사용법

이 문서는 DevDeck 백엔드 API를 사용하기 위한 클라이언트 라이브러리의 사용법을 설명합니다.

## 설치 및 설정

### 1. 환경변수 설정

`.env` 파일에서 API 서버 주소를 설정합니다:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 2. 기본 사용법

```typescript
import { api } from '@/api'

// 통합 API 객체 사용
const result = await api.auth.login({ email, password })
```

## API 모듈별 사용법

### 인증 (Authentication)

```typescript
import { authAPI } from '@/api'

// 로그인
const tokenResponse = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
})

// 회원가입
const user = await authAPI.signup({
  email: 'newuser@example.com',
  password: 'password123',
  nickname: 'NewUser'
})

// 로그아웃
await authAPI.logout()

// 로그인 상태 확인
const isLoggedIn = authAPI.isLoggedIn()
```

### 사용자 (User)

```typescript
import { userAPI } from '@/api'

// 내 프로필 조회
const myProfile = await userAPI.getMyProfile()

// 프로필 수정
const updatedProfile = await userAPI.updateMyProfile({
  nickname: 'NewNickname'
})

// 다른 사용자 프로필 조회
const userProfile = await userAPI.getUserProfile(123)

// 사용자가 작성한 글 목록
const userPosts = await userAPI.getUserPosts(123, { page: 1, limit: 10 })
```

### 게시글 (Posts)

```typescript
import { postAPI } from '@/api'

// 게시글 목록 조회
const posts = await postAPI.getPosts({
  page: 1,
  limit: 10,
  sort: 'latest',
  query: '검색어',
  tag: '태그명'
})

// 게시글 상세 조회
const post = await postAPI.getPostDetail(123)

// 게시글 작성
const newPost = await postAPI.createPost({
  title: '게시글 제목',
  content: '게시글 내용',
  tags: ['태그1', '태그2']
})

// 게시글 수정
const updatedPost = await postAPI.updatePost(123, {
  title: '수정된 제목',
  content: '수정된 내용'
})

// 게시글 삭제
await postAPI.deletePost(123)

// 좋아요 토글
const likeResult = await postAPI.toggleLike(123)

// 내가 쓴 글 목록
const myPosts = await postAPI.getMyPosts({ page: 1, limit: 10 })
```

### 댓글 (Comments)

```typescript
import { postAPI } from '@/api'

// 댓글 작성
const comment = await postAPI.createComment(123, {
  content: '댓글 내용',
  parentCommentId: 456 // 대댓글인 경우
})

// 댓글 수정
const updatedComment = await postAPI.updateComment(789, {
  content: '수정된 댓글 내용'
})

// 댓글 삭제
await postAPI.deleteComment(789)
```

### 관리자 (Admin)

```typescript
import { adminAPI } from '@/api'

// 관리자 대시보드 통계
const dashboard = await adminAPI.getDashboard()

// 전체 게시글 목록 (관리자용)
const allPosts = await adminAPI.getAllPosts({ page: 1, limit: 50 })

// 관리자 게시글 삭제
await adminAPI.deletePost(123, { deleteType: 'soft' })

// 관리자 댓글 삭제
await adminAPI.deleteComment(456)

// 공지사항 조회
const announcements = await adminAPI.getActiveAnnouncements()

// 공지사항 작성
const announcement = await adminAPI.createAnnouncement({
  title: '공지사항 제목',
  content: '공지사항 내용',
  isActive: true
})
```

## Vue Composables 사용법

더 편리한 사용을 위해 Vue Composable을 제공합니다.

### 인증 Composable

```vue
<script setup lang="ts">
import { useAuth } from '@/composables'

const { 
  user,           // 현재 로그인된 사용자 정보
  isLoggedIn,     // 로그인 상태
  isLoading,      // 로딩 상태
  error,          // 에러 메시지
  login,          // 로그인 함수
  logout,         // 로그아웃 함수
  signup          // 회원가입 함수
} = useAuth()

// 로그인
const handleLogin = async () => {
  const success = await login('user@example.com', 'password123')
  if (success) {
    console.log('로그인 성공!')
  }
}
</script>
```

### 게시글 Composable

```vue
<script setup lang="ts">
import { usePosts, usePostDetail, usePostEditor } from '@/composables'

// 게시글 목록
const { posts, isLoading, error, fetchPosts, searchPosts } = usePosts()

// 게시글 상세
const { post, toggleLike } = usePostDetail(123)

// 게시글 편집
const { createPost, updatePost, deletePost } = usePostEditor(123)

// 게시글 목록 가져오기
await fetchPosts({ page: 1, limit: 10 })

// 검색
await searchPosts('검색어')

// 게시글 작성
const newPost = await createPost({
  title: '제목',
  content: '내용',
  tags: ['태그1']
})
</script>
```

### 댓글 Composable

```vue
<script setup lang="ts">
import { useComments } from '@/composables'

const { createComment, updateComment, deleteComment } = useComments(123)

// 댓글 작성
const comment = await createComment('댓글 내용')

// 대댓글 작성
const reply = await createComment('대댓글 내용', 456)
</script>
```

## 에러 처리

API 호출 시 발생할 수 있는 에러들이 자동으로 처리됩니다:

- **401 Unauthorized**: 자동으로 토큰을 제거하고 `auth-error` 이벤트를 발생시킵니다
- **422 Validation Error**: 유효성 검사 에러를 사용자 친화적인 메시지로 변환합니다
- **네트워크 에러**: 적절한 에러 메시지를 제공합니다

```typescript
// 에러 처리 예제
try {
  await api.post.createPost(postData)
} catch (error) {
  console.error('게시글 작성 실패:', error.message)
  // error.status로 HTTP 상태 코드에 접근 가능
}
```

## 인증 상태 관리

토큰은 자동으로 localStorage에 저장되고 관리됩니다:

```typescript
import { TokenManager } from '@/api'

// 토큰 확인
const hasToken = TokenManager.hasToken()

// 토큰 가져오기
const token = TokenManager.getToken()

// 토큰 직접 설정 (일반적으로 사용하지 않음)
TokenManager.setToken('your-token')

// 토큰 제거
TokenManager.removeToken()
```

## 실제 사용 예제

`src/components/ApiExample.vue`에서 실제 사용 예제를 확인할 수 있습니다.

## 환경별 설정

- `.env.development`: 개발 환경 설정
- `.env.production`: 프로덕션 환경 설정

각 환경에 맞는 API 서버 주소를 설정하세요.
