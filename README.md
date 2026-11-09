# study-with-claude

Claude와 함께하는 프론트엔드 심화 학습 저장소입니다.
개념 학습 → 코드 문제 → 직접 구현 → 피드백 순서로 진행합니다.

## 트랙

- `js/` — JavaScript 심화 (실행 컨텍스트, 클로저, this, 비동기, 이벤트 루프 등)
- `react/` — React 심화 (렌더링 원리, hooks, 성능, 상태 관리 등)

## JS 트랙

```
js/
  01-scope-closure/
    s1-concept.html        # 개념 노트
    s1-predict/            # 문제 (README + 구현 파일 + 테스트)
```

```bash
npm install
npm test                                # 전체 (watch)
npm test -- js/01-scope-closure         # 특정 폴더만
```

## React 트랙

Vite + React + TypeScript, 테스트는 Vitest(jsdom) + Testing Library.

```
react/
  notes/                   # 개념 노트 HTML
  src/
    w1-rendering/          # 주차별 문제
```

```bash
cd react
npm install
npm test                                # 전체 (watch)
npm test -- src/w1-rendering            # 특정 폴더만
npm run dev                             # 화면으로 확인
```
