// ⚠️ 이 파일은 수정하지 마세요. 실행해 보지 말고 읽기만 하고 예측하세요.
// 각 스니펫은 log로 값을 기록합니다. 에러가 나면 그 지점에서 스니펫이 끝납니다.
// (ES 모듈이므로 strict mode로 실행됩니다)

export const snippets = {
  p1(log) {
    const name = 'global';
    function printName() {
      log(name);
    }
    function run() {
      const name = 'run';
      printName();
    }
    run();
  },

  p2(log) {
    log(x);
    var x = 1;
    log(x);
    function inner() {
      log(x);
      var x = 2;
    }
    inner();
  },

  p3(log) {
    log(typeof fn);
    var fn = 'str';
    log(typeof fn);
    function fn() {}
    log(typeof fn);
  },

  p4(log) {
    var f = function () {
      return 1;
    };
    function f() {
      return 2;
    }
    log(f());
  },

  p5(log) {
    const getX = () => x;
    let x = 10;
    log(getX());
  },

  p6(log) {
    let v = 'outer';
    function g() {
      log(v);
      let v = 'inner';
    }
    g();
  },

  p7(log) {
    // typeof에서는 바인딩 없어도 undefined를 반환함.
    log(typeof y);
    {
      log(typeof y);
      let y = 1;
    }
  },

  p8(log) {
    let n = 'outer';
    function h(a = n, n = 'param') {
      return a;
    }
    log(h());
  },

  p9(log) {
    function k(a) {
      log(a);
      var a = 2;
      log(a);
    }
    k(1);
  },

  p10(log) {
    function make() {
      return new Point(3);
    }
    class Point {
      constructor(x) {
        this.x = x;
      }
    }
    log(make().x);
  },
};
