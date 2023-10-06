export interface Constructible<T = any> {
  new (...args: any[]): T;
}
