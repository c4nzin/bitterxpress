import { Constructible } from '../interfaces/constructible.interface';

type Token<T = unknown> = string | Constructible<T>;

export { Token };
