# W1-S1 · 문제 2. 미니 Environment Record 구현

엔진이 식별자를 어떻게 등록하고 찾는지 직접 구현해 봅니다.
`environment.js`의 `Environment` 클래스를 완성하세요. (constructor 포함 메서드 6개)

## 요구사항

### `new Environment(outer = null)`
바깥 환경(`[[OuterEnv]]`)을 받습니다. 전역이면 `null`.

### `declare(name, kind, value)` — 선언 인스턴스화 단계
`kind`는 `'var' | 'function' | 'let' | 'const'`.

| kind | 동작 |
|---|---|
| `var` | 바인딩을 만들고 `undefined`로 초기화. **같은 환경에 이미 var/function 바인딩이 있으면 아무것도 하지 않음** |
| `function` | 바인딩을 만들고 `value`(함수)로 초기화. 이미 var/function 바인딩이 있으면 **값을 덮어씀** |
| `let` / `const` | 바인딩만 만들고 **초기화하지 않음** (TDZ) |

- 같은 환경에 let/const 바인딩이 있는 이름을 다시 선언하거나, var/function이 있는 이름을 let/const로 선언하면
  `SyntaxError("Identifier 'x' has already been declared")`

### `initialize(name, value = undefined)` — `let x = ...` 선언문이 실행되는 순간
이 환경의 let/const 바인딩을 `value`로 초기화합니다.

### `get(name)`
- 현재 환경부터 `outer`를 따라 바인딩을 찾습니다.
- 찾았는데 초기화 전이면 `ReferenceError("Cannot access 'x' before initialization")`
- 끝까지 없으면 `ReferenceError("x is not defined")`

### `set(name, value)` (strict mode 기준)
- 찾는 방식은 `get`과 같고, 없을 때와 TDZ일 때도 `get`과 같은 에러를 던집니다.
- `const` 바인딩이면 `TypeError("Assignment to constant variable.")`
- 바인딩을 **찾은 환경의 값**을 바꿉니다. (현재 환경에 새로 만들지 않음)

### `typeOf(name)` — `typeof name` 연산자
- 어디에도 없으면 `'undefined'` (에러 아님)
- TDZ면 `get`과 같은 `ReferenceError`
- 그 외에는 `typeof 값`

## 실행
```bash
npm test -- js/01-scope-closure/s1-environment
```

## 생각해 볼 것 (피드백 때 질문합니다)
1. `var`는 이미 있으면 무시하고 `function`은 덮어쓰는 규칙만으로, 선언 순서와 관계없이 확인 질문 Q2의 결과가 나오는 이유는?
2. `set`이 바인딩을 못 찾았을 때 sloppy mode에서는 어떻게 동작할까?
