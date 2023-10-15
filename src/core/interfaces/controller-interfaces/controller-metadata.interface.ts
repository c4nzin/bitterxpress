import { RequestHandler } from 'express';
import { Headers } from '../../../features';

export interface ControllerMetadata {
  route: string;
  middlewares?: RequestHandler[];
  defaultHttpStatus?: number;
  headers?: Headers;
}
