import { Constructible } from '../interfaces/constructible.interface';

type Token<T = any> = string | Constructible<T>;

export { Token };
