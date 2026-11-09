import { describe, it, expect } from 'vitest';
import { Environment } from './environment.js';

const fn = function () {};

describe('declare + get', () => {
  it('var는 undefined로 초기화된다', () => {
    const env = new Environment();
    env.declare('a', 'var');
    expect(env.get('a')).toBeUndefined();
  });

  it('function은 함수 값으로 초기화된다', () => {
    const env = new Environment();
    env.declare('f', 'function', fn);
    expect(env.get('f')).toBe(fn);
  });

  it('let은 초기화 전에 접근하면 ReferenceError (TDZ)', () => {
    const env = new Environment();
    env.declare('b', 'let');
    expect(() => env.get('b')).toThrow(ReferenceError);
    expect(() => env.get('b')).toThrow("Cannot access 'b' before initialization");
  });

  it('initialize 후에는 값을 읽을 수 있다', () => {
    const env = new Environment();
    env.declare('b', 'let');
    env.initialize('b', 2);
    expect(env.get('b')).toBe(2);
  });

  it('initialize에 값이 없으면 undefined로 초기화된다 (let x;)', () => {
    const env = new Environment();
    env.declare('b', 'let');
    env.initialize('b');
    expect(env.get('b')).toBeUndefined();
  });

  it('없는 식별자는 "is not defined" ReferenceError', () => {
    const env = new Environment();
    expect(() => env.get('nope')).toThrow(ReferenceError);
    expect(() => env.get('nope')).toThrow('nope is not defined');
  });
});

describe('같은 이름 선언', () => {
  it('var가 먼저, function이 나중이면 function 값이 된다', () => {
    const env = new Environment();
    env.declare('fn', 'var');
    env.declare('fn', 'function', fn);
    expect(env.get('fn')).toBe(fn);
  });

  it('function이 먼저, var가 나중이어도 function 값이 유지된다', () => {
    const env = new Environment();
    env.declare('fn', 'function', fn);
    env.declare('fn', 'var');
    expect(env.get('fn')).toBe(fn);
  });

  it('var 중복 선언은 허용된다', () => {
    const env = new Environment();
    env.declare('a', 'var');
    env.set('a', 1);
    env.declare('a', 'var');
    expect(env.get('a')).toBe(1);
  });

  it('let 중복 선언은 SyntaxError', () => {
    const env = new Environment();
    env.declare('a', 'let');
    expect(() => env.declare('a', 'let')).toThrow(SyntaxError);
    expect(() => env.declare('a', 'let')).toThrow("Identifier 'a' has already been declared");
  });

  it('var 다음 같은 이름의 const는 SyntaxError', () => {
    const env = new Environment();
    env.declare('a', 'var');
    expect(() => env.declare('a', 'const')).toThrow(SyntaxError);
  });

  it('let 다음 같은 이름의 var/function도 SyntaxError', () => {
    const env = new Environment();
    env.declare('a', 'let');
    expect(() => env.declare('a', 'var')).toThrow(SyntaxError);
    expect(() => env.declare('a', 'function', fn)).toThrow(SyntaxError);
  });

  it('다른 환경(바깥)에 같은 이름이 있는 것은 문제없다', () => {
    const outer = new Environment();
    outer.declare('a', 'let');
    const inner = new Environment(outer);
    expect(() => inner.declare('a', 'let')).not.toThrow();
  });
});

describe('스코프 체인', () => {
  it('안쪽에 없으면 바깥에서 찾는다', () => {
    const global = new Environment();
    global.declare('x', 'const');
    global.initialize('x', 'global');
    const inner = new Environment(global);
    expect(inner.get('x')).toBe('global');
  });

  it('가장 가까운 바인딩이 우선한다 (shadowing)', () => {
    const global = new Environment();
    global.declare('x', 'const');
    global.initialize('x', 'global');
    const inner = new Environment(global);
    inner.declare('x', 'const');
    inner.initialize('x', 'inner');
    expect(inner.get('x')).toBe('inner');
    expect(global.get('x')).toBe('global');
  });

  it('안쪽의 TDZ 바인딩이 바깥 변수를 가린다', () => {
    const global = new Environment();
    global.declare('v', 'let');
    global.initialize('v', 'outer');
    const block = new Environment(global);
    block.declare('v', 'let');
    expect(() => block.get('v')).toThrow("Cannot access 'v' before initialization");
  });
});

describe('set', () => {
  it('찾은 환경의 값을 바꾼다', () => {
    const global = new Environment();
    global.declare('count', 'let');
    global.initialize('count', 0);
    const inner = new Environment(global);
    inner.set('count', 1);
    expect(global.get('count')).toBe(1);
    expect(inner.get('count')).toBe(1);
  });

  it('const 재할당은 TypeError', () => {
    const env = new Environment();
    env.declare('c', 'const');
    env.initialize('c', 1);
    expect(() => env.set('c', 2)).toThrow(TypeError);
    expect(() => env.set('c', 2)).toThrow('Assignment to constant variable.');
    expect(env.get('c')).toBe(1);
  });

  it('TDZ인 바인딩에 할당하면 ReferenceError', () => {
    const env = new Environment();
    env.declare('b', 'let');
    expect(() => env.set('b', 1)).toThrow("Cannot access 'b' before initialization");
  });

  it('없는 식별자에 할당하면 ReferenceError (strict mode)', () => {
    const env = new Environment();
    expect(() => env.set('ghost', 1)).toThrow('ghost is not defined');
  });

  it('var/function 바인딩은 다른 타입 값으로 바꿀 수 있다', () => {
    const env = new Environment();
    env.declare('fn', 'function', fn);
    env.set('fn', 1);
    expect(env.get('fn')).toBe(1);
  });
});

describe('typeOf', () => {
  it('없는 식별자는 에러 없이 "undefined"', () => {
    const env = new Environment();
    expect(env.typeOf('nothing')).toBe('undefined');
  });

  it('TDZ면 ReferenceError', () => {
    const env = new Environment();
    env.declare('later', 'let');
    expect(() => env.typeOf('later')).toThrow(ReferenceError);
  });

  it('값의 typeof를 돌려준다', () => {
    const env = new Environment();
    env.declare('n', 'const');
    env.initialize('n', null);
    env.declare('f', 'function', fn);
    expect(env.typeOf('n')).toBe('object');
    expect(env.typeOf('f')).toBe('function');
  });

  it('Q2 재현: 선언 단계 후 function, 할당 후 number', () => {
    const env = new Environment();
    // 선언 단계 (소스 순서: var fn → function fn)
    env.declare('fn', 'var');
    env.declare('fn', 'function', fn);
    expect(env.typeOf('fn')).toBe('function');
    // 실행 단계: fn = 1
    env.set('fn', 1);
    expect(env.typeOf('fn')).toBe('number');
  });
});
