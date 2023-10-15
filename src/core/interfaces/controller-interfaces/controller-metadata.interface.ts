import { RequestHandler } from 'express';

interface Headers {
  [P: string]: string;
}

export interface ControllerMetadata {
  route: string;
  middlewares?: RequestHandler[];
  defaultHttpStatus?: number;
  headers?: Headers;
}
