import { RequestHandler } from 'express';
import { Constructible } from './constructible.interface';
import { CustomProvider } from '../types/custom-provider.type';

export interface AppProperties {
  port: number;
  controllers?: Constructible[];
  useGlobalMiddlewares?: RequestHandler[];
  customProviders?: CustomProvider[];
}
