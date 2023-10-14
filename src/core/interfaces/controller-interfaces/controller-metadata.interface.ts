import { RequestHandler } from 'express';
import { Headers } from '../headers.interface';

export interface ControllerMetadata {
  route: string;
  middlewares?: RequestHandler[];
  defaultHttpStatus?: number;
  headers?: Headers;
}
