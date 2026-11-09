import { describe, it, expect } from 'vitest';
import { snippets } from './snippets.js';
import { predictions } from './predictions.js';
import { TODO, throws } from './helpers.js';

function run(snippet) {
  const out = [];
  try {
    snippet((value) => out.push(value));
  } catch (e) {
    out.push(throws(e.name));
  }
  return out;
}

describe('W1-S1 출력 예측', () => {
  for (const key of Object.keys(snippets)) {
    if (predictions[key] === TODO) {
      it.todo(key);
      continue;
    }
    it(key, () => {
      expect(run(snippets[key])).toEqual(predictions[key]);
    });
  }
});
