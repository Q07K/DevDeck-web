# DevDeck-web

개발자를 위한 모던 블로그 플랫폼입니다. Vue 3, TypeScript, Tailwind CSS를 사용하여 구축된 반응형 웹 애플리케이션입니다.

## 주요 기능

- **게시글 관리**: 게시글 작성, 수정, 조회
- **댓글 시스템**: 계층형 댓글 지원
- **태그 시스템**: 게시글 분류 및 검색
- **사용자 프로필**: 사용자 정보 관리
- **다크모드**: 라이트/다크 테마 지원
- **반응형 디자인**: 모바일부터 데스크탑까지 최적화
- **빠른 성능**: Vite 기반의 빠른 개발 환경

## 기술 스택

### Frontend
- **Vue 3** - 프로그레시브 JavaScript 프레임워크
- **TypeScript** - 타입 안정성을 위한 JavaScript 확장
- **Vue Router** - Vue.js 공식 라우팅 라이브러리
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Vite** - 차세대 프론트엔드 빌드 도구

### 의존성
- **Marked** - 마크다운 파서 및 컴파일러
- **Lucide Vue Next** - 아이콘 라이브러리

## 프로젝트 구조

```
DevDeck-web/
├── src/
│   ├── components/          # 재사용 가능한 Vue 컴포넌트
│   │   ├── AppHeader.vue    # 헤더 컴포넌트
│   │   ├── AppFooter.vue    # 푸터 컴포넌트
│   │   ├── PostCard.vue     # 게시글 카드 컴포넌트
│   │   └── CommentItem.vue  # 댓글 아이템 컴포넌트
│   ├── views/               # 페이지 컴포넌트
│   │   ├── HomeView.vue     # 홈페이지
│   │   ├── PostDetailView.vue    # 게시글 상세
│   │   ├── PostEditorView.vue    # 게시글 편집기
│   │   └── UserProfileView.vue   # 사용자 프로필
│   ├── data/
│   │   └── mock.ts          # 목업 데이터
│   ├── router/
│   │   └── index.ts         # 라우팅 설정
│   ├── types/
│   │   └── index.ts         # TypeScript 타입 정의
│   ├── assets/
│   │   └── main.css         # 메인 스타일시트
│   ├── App.vue              # 루트 컴포넌트
│   └── main.ts              # 애플리케이션 진입점
├── public/                  # 정적 파일
├── package.json
├── vite.config.ts           # Vite 설정
├── tailwind.config.js       # Tailwind CSS 설정
├── tsconfig.json            # TypeScript 설정
└── README.md
```

## 시작하기

### 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/Q07K/DevDeck-web.git
cd DevDeck-web
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:5173
```

### 빌드 및 배포

**프로덕션 빌드**
```bash
npm run build
```

**빌드 결과 미리보기**
```bash
npm run preview
```

## 주요 컴포넌트

### PostCard
게시글 목록에서 사용되는 카드형 컴포넌트로 제목, 요약, 작성자, 태그 등의 정보를 표시합니다.

### CommentItem  
계층형 댓글을 지원하는 댓글 컴포넌트입니다.

### AppHeader
네비게이션과 사용자 메뉴가 포함된 헤더 컴포넌트입니다.

## 스타일링

- **Tailwind CSS**: 유틸리티 클래스 기반의 빠른 스타일링
- **다크모드**: `dark:` 접두사를 통한 다크테마 지원
- **반응형**: 모바일 퍼스트 접근 방식
- **한글 폰트**: Noto Sans KR과 Inter 폰트 적용

## 개발 정보

### 스크립트 명령어
- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 앱 미리보기

### 환경 설정
- **TypeScript**: 엄격한 타입 검사 활성화
- **Path Alias**: `@` 별칭으로 `src` 디렉터리 참조
- **PostCSS**: Tailwind CSS와 Autoprefixer 설정

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 강의용 자료로 제작되었습니다.

## 작성자

**Q07K** - *Initial work* - [Q07K](https://github.com/Q07K)

---

이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!
