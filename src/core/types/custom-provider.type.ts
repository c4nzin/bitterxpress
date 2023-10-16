import { Constructible } from '../interfaces';

export type CustomProvider<T = any> = {
  token: string | Constructible<T>;
  instance: T;
};
