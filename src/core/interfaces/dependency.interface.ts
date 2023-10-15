import { Token } from '../types/token.type';

export interface Dependency<T = any> {
  token: Token<T>;
  instance?: T;
}
