import { Token } from '../types/token.type';

export interface Dependency<T = unknown> {
  token: Token<T>;
  instance?: T;
}
