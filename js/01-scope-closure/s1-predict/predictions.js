import { TODO, throws } from './helpers.js';

// 각 스니펫에서 log된 값을 순서대로 배열에 적으세요.
// - 값은 실제 JS 값으로: undefined(값)와 'undefined'(문자열)는 다릅니다.
// - 에러가 나면 마지막 원소로 throws('에러이름')을 넣으세요.
//   예) [1, 'a', throws('TypeError')]
// - 각 줄 위에 "왜 그런지" 한 줄 주석을 남기면 피드백 때 같이 봅니다.

export const predictions = {
  p1: ['global'],
  p2: [undefined, 1, undefined],
  p3: ['function', 'string', 'string'],
  p4: [1],
  p5: [10],
  p6: [throws('ReferenceError')],
  p7: ['undefined', throws('ReferenceError')],
  p8: [throws('ReferenceError')],
  p9: [1, 2],
  p10: [3],
};

// 사용하지 않는 import 경고 방지용
void throws;
