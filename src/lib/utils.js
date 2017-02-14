export function curry(fn) {
  return (a) => (b) => fn(a, b);
}

export function* entries(object = {}) {
  for (const key of Object.keys(object)) {
    if (key && key.charAt(0) !== '_') {
      yield [key, object[key]];
    }
  }
}

export class IO {
  static of = x => new IO(() => x);

  constructor(f) {
    this._runIO = f;
  }
  runIO() {
    return Promise.resolve(this._runIO());
  }
  chain(f) {
    return new IO(() => {
      return this.runIO().then(val => f(val).runIO());
    });
  }
  map(f) {
    return this.chain(x => IO.of(f(x)));
  }
}
