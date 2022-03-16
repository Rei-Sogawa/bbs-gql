export class MyObject<T> {
  constructor(value: T) {
    Object.assign(this, value);
  }

  map<U>(fn: (a: T) => U) {
    const { ...props } = this;
    return new MyObject(fn(props as unknown as T));
  }

  join<U>(fn: (a: T) => U) {
    const { ...props } = this;
    return fn(props as unknown as T);
  }
}
