import { Constructible } from '../interfaces/constructible.interface';

export type Token<T = any> = string | Constructible<T>;
