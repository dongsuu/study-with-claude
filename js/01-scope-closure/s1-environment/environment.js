/**
 * 미니 Environment Record.
 * 요구사항은 README.md를 참고하세요.
 */
export class Environment {
  /**
   * @param {Environment | null} outer
   */
  constructor(outer = null) {
    this.outer = outer;
    this.map = new Map();
  }

  /**
   * @param {string} name
   * @param {'var' | 'function' | 'let' | 'const'} kind
   * @param {unknown} [value] kind가 'function'일 때의 함수 값
   */
  declare(name, kind, value) {
    let record = this.map.get(name);
    if(kind === 'var') {
      if(record?.kind === 'let' || record?.kind === 'const') {
        throw new SyntaxError(`Identifier '${name}' has already been declared`);
      }
      if(record) return;
      record = { initialized: true, kind: 'var', value: undefined};
    } else if(kind === 'function') {
      if(record?.kind === 'let' || record?.kind === 'const') {
        throw new SyntaxError(`Identifier '${name}' has already been declared`);
      }
      record = { initialized: true, kind: 'function', value };
    } else if(kind === 'let' || kind === 'const') {
      if(record) {
        throw new SyntaxError(`Identifier '${name}' has already been declared`);
      }
      record = { initialized: false, kind: kind };
    }
    this.map.set(name, record);
  }

  /**
   * @param {string} name
   * @param {unknown} [value]
   */
  initialize(name, value = undefined) {
    this.map.set(name, {...this.map.get(name), initialized: true, value});
  }

  /**
   * @param {string} name
   * @returns {unknown}
   */
  get(name) {
    let record = this.lookup(name);
    if(!record) {
      throw new ReferenceError(`${name} is not defined`);
    }
    if(!record.initialized) throw new ReferenceError(`Cannot access '${name}' before initialization`);
    return record.value;
  }

  lookup(name) {
      if(this.map.has(name)) return this.map.get(name);
      if(!this.outer) return undefined;
      return this.outer.lookup(name);
  }

  /**
   * @param {string} name
   * @param {unknown} value
   */
  set(name, value) {
    let record = this.lookup(name);
    if(!record) {
      throw new ReferenceError(`${name} is not defined`);
    }
    if(!record.initialized) {
      throw new ReferenceError(`Cannot access '${name}' before initialization`);
    }
    if(record && record.kind === 'const') {
      throw new TypeError("Assignment to constant variable.");
    }
    record.value = value;
  }

  /**
   * @param {string} name
   * @returns {string}
   */
  typeOf(name) {
    let record  = this.lookup(name);
    if(!record) {
      return "undefined";
    }
    if(!record.initialized) {
      throw new ReferenceError(`Cannot access '${name}' before initialization`);
    }
    return typeof record.value;
  }
}
