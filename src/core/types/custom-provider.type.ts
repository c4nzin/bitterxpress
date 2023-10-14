import { Constructible } from '../interfaces';

export type CustomProvider<T = unknown> = {
  token: string | Constructible<T>;
  instance: T;
};
