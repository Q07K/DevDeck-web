import { User, Post } from '@/types'

export const mockUsers: Record<number, User> = {
  1: { id: 1, nickname: 'CodeMaster', email: 'coder@example.com' },
  2: { id: 2, nickname: 'ReactFan', email: 'react@example.com' },
  3: { id: 3, nickname: 'DBAdmin', email: 'db@example.com' },
}

export const mockPosts: Post[] = [
  {
    id: 101,
    title: 'React Hooks 마스터하기: useEffect 완벽 가이드',
    summary: 'useEffect의 기본 사용법부터 의존성 배열, 클린업 함수까지 깊이 있게 알아봅니다. 사이드 이펙트를 다루는 가장 중요한 훅 중 하나를 마스터하세요.',
    content: `## 서론

React Hooks는 함수형 컴포넌트에서 상태(state)와 생명주기(lifecycle) 기능을 연동할 수 있게 해주는 함수입니다. 그 중 \`useEffect\`는 컴포넌트 렌더링 이후에 어떤 일을 수행해야 할 때 사용하는 가장 중요한 훅 중 하나입니다.

### 기본 사용법

\`useEffect\`는 두 개의 인자를 받습니다: 콜백 함수와 의존성 배열(dependency array)입니다.

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 이 코드는 매 렌더링 후에 실행됩니다.
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### 의존성 배열

의존성 배열을 사용하면 특정 값이 변경되었을 때만 이펙트 함수가 실행되도록 제어할 수 있습니다. 빈 배열(\`[]\`)을 전달하면 컴포넌트가 마운트될 때 한 번만 실행됩니다.

\`\`\`javascript
useEffect(() => {
  // count가 변경될 때만 실행됩니다.
  console.log('Count has changed:', count);
}, [count]);
\`\`\`

### 클린업(Clean-up) 함수

메모리 누수를 방지하기 위해 이펙트가 정리되어야 할 때가 있습니다. (예: 구독 해제, 타이머 제거) \`useEffect\` 콜백 함수에서 함수를 반환하면, 이 함수가 컴포넌트가 언마운트되거나 다음 이펙트가 실행되기 전에 호출됩니다.

\`\`\`javascript
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // 클린업 함수
  return () => {
    clearInterval(timerId);
    console.log('Timer cleared!');
  };
}, []);
\`\`\`

## 결론

\`useEffect\`는 React 애플리케이션에서 비동기 작업, API 호출, 구독 등 다양한 사이드 이펙트를 관리하는 강력한 도구입니다. 의존성 배열과 클린업 함수를 올바르게 사용하여 예측 가능하고 효율적인 컴포넌트를 만들어보세요.`,
    likeCount: 42,
    commentCount: 2,
    viewCount: 1024,
    authorId: 1,
    createdAt: '2025-08-14T11:00:00Z',
    tags: ['React', 'TypeScript', 'JavaScript'],
    comments: [
      { id: 301, authorId: 2, content: '정말 유용한 글이네요! 클린업 함수 부분이 특히 도움이 되었습니다.', parentCommentId: null, createdAt: '2025-08-14T13:00:00Z' },
      { id: 302, authorId: 1, content: '감사합니다! 궁금한 점 있으시면 언제든지 질문해주세요.', parentCommentId: 301, createdAt: '2025-08-14T14:30:00Z' },
    ]
  },
  {
    id: 102,
    title: 'Tailwind CSS를 사용해야 하는 5가지 이유',
    summary: '유틸리티 우선(Utility-First) 접근 방식이 어떻게 프론트엔드 개발 생산성을 극적으로 향상시키는지 알아봅니다. CSS 작성 방식의 패러다임 전환을 경험하세요.',
    content: `## Tailwind CSS란?

Tailwind CSS는 미리 정의된 유틸리티 클래스들을 조합하여 HTML 내에서 직접 스타일을 적용하는 **유틸리티 우선(Utility-First)** CSS 프레임워크입니다. 

### 1. 빠른 개발 속도

CSS 파일을 떠나지 않고 HTML에서 바로 스타일링을 완성할 수 있습니다. 클래스 이름을 고민할 필요가 없어 생산성이 크게 향상됩니다.

### 2. 높은 커스터마이징 자유도

\`tailwind.config.js\` 파일을 통해 색상, 간격, 폰트 등 디자인 시스템의 모든 요소를 쉽게 커스터마이징할 수 있습니다.

### 3. 일관성 있는 디자인

미리 정의된 디자인 토큰(spacing, colors 등)을 사용하므로 프로젝트 전체에 걸쳐 일관된 UI를 유지하기 쉽습니다.

### 4. 반응형 디자인의 용이성

\`sm:\`, \`md:\`, \`lg:\` 와 같은 반응형 접두사를 사용하여 직관적으로 반응형 디자인을 구현할 수 있습니다.

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3 p-4">
  <!-- Content -->
</div>
\`\`\`

### 5. 작은 최종 번들 사이즈

PurgeCSS (JIT 모드에서는 기본 내장)를 통해 프로덕션 빌드 시 사용되지 않는 모든 유틸리티 클래스를 제거하여 최종 CSS 파일의 크기를 매우 작게 유지합니다.`,
    likeCount: 128,
    commentCount: 5,
    viewCount: 2500,
    authorId: 2,
    createdAt: '2025-08-12T09:30:00Z',
    tags: ['CSS', 'TailwindCSS', 'Frontend'],
    comments: []
  },
  {
    id: 103,
    title: 'Node.js와 Express로 REST API 구축하기',
    summary: 'Node.js 런타임 환경과 Express 프레임워크를 사용하여 기본적인 CRUD 기능을 갖춘 RESTful API 서버를 만드는 과정을 단계별로 안내합니다.',
    content: `## 시작하기

Node.js와 npm이 설치되어 있어야 합니다. 프로젝트 폴더를 만들고 시작해봅시다.

\`\`\`bash
npm init -y
npm install express
\`\`\`

## 기본 서버 설정

\`index.js\` 파일을 만들고 다음 코드를 작성합니다.

\`\`\`javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening at http://localhost:\${port}\`);
});
\`\`\`

이제 터미널에서 \`node index.js\`를 실행하면 기본적인 웹 서버가 동작합니다.`,
    likeCount: 95,
    commentCount: 8,
    viewCount: 1800,
    authorId: 1,
    createdAt: '2025-08-10T15:00:00Z',
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    comments: []
  },
  {
    id: 104,
    title: 'SQL 인덱스(Index)의 원리와 최적화 전략',
    summary: '데이터베이스 성능의 핵심인 인덱스가 어떻게 동작하는지 알아보고, 쿼리 성능을 극대화하기 위한 효과적인 인덱스 설계 및 최적화 전략을 다룹니다.',
    content: `## 인덱스란?

인덱스는 데이터베이스 테이블에 대한 검색 성능의 속도를 높여주는 자료 구조입니다. 책의 맨 뒤에 있는 색인과 비슷한 역할을 합니다.

## B-Tree 인덱스

대부분의 관계형 데이터베이스는 B-Tree(Balanced Tree) 자료 구조를 사용하여 인덱스를 구현합니다. B-Tree는 데이터가 정렬된 상태로 유지되며, 어떤 값을 찾더라도 항상 비슷한 탐색 시간이 소요되는 장점이 있습니다.

## 인덱스 최적화 전략

1.  **카디널리티(Cardinality)가 높은 컬럼에 인덱스를 생성하세요.** (예: 주민등록번호, 이메일)
2.  **WHERE 절에 자주 사용되는 컬럼에 인덱스를 추가하세요.**
3.  **외래 키(Foreign Key)에는 인덱스를 생성하는 것이 좋습니다.** JOIN 성능이 향상됩니다.
4.  **인덱스가 적용된 컬럼을 가공하지 마세요.** (예: \`WHERE SUBSTRING(name, 1, 3) = '김씨'\`)`,
    likeCount: 210,
    commentCount: 15,
    viewCount: 4200,
    authorId: 3,
    createdAt: '2025-08-05T18:20:00Z',
    tags: ['Database', 'SQL', 'Performance'],
    comments: []
  }
]
