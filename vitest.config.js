import { defineConfig } from 'vitest/config';

// React 트랙은 react/ 안에서 자체 설정(jsdom)으로 실행한다.
export default defineConfig({
  test: {
    include: ['js/**/*.test.js'],
  },
});
