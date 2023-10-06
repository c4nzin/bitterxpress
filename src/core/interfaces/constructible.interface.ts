/**
 * A general-purpose constructible interface.
 * @typeparam T The type of the object being constructed.
 */
export interface Constructible<T = any> {
  new (...args: any[]): T;
}
