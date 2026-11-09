// 아직 예측하지 않은 문제 표시 (테스트에서 todo로 처리)
export const TODO = Symbol('TODO');

// 스니펫이 에러를 던질 것으로 예측할 때 사용: throws('ReferenceError')
export const throws = (name) => ({ throws: name });
