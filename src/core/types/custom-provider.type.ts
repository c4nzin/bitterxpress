import { Constructible } from '../interfaces';

export type CustomProvider = {
  token: string | Constructible;
  instance: any;
};
