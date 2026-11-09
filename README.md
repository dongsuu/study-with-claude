# study-with-claude

Claude와 함께하는 프론트엔드 심화 학습 저장소입니다.
개념 학습 → 코드 문제 → 직접 구현 → 피드백 순서로 진행합니다.

## 트랙

- `js/` — JavaScript 심화 (실행 컨텍스트, 클로저, this, 비동기, 이벤트 루프 등)
- `react/` — React 심화 (렌더링 원리, hooks, 성능, 상태 관리 등)

## 문제 폴더 구조

```
js/
  01-scope-closure/
    once/
      README.md        # 문제 설명
      once.js          # 직접 구현하는 파일
      once.test.js     # 테스트
```

## 실행

```bash
npm install
npm test                 # 전체 테스트 (watch)
npm test -- js/01-scope-closure   # 특정 폴더만
```
