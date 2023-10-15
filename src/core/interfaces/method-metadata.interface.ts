import { RequestHandler } from 'express';
import { HttpMethods } from '../enums/http-method-enums/http-methods.enum';
import { ArgumentIndices } from '../types/argument-indices.type';

interface Headers {
  [P: string]: string;
}

export interface MethodMetadata {
  httpMethod: HttpMethods;
  path: string;
  argumentIndices: ArgumentIndices;
  middlewares?: RequestHandler[];
  defaultHttpStatus?: number;
  headers?: Headers;
}
