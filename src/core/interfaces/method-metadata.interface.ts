import { RequestHandler } from 'express';
import { HttpMethod } from '../enums/http-methods.enum';
import { ArgumentIndices } from '../types/argument-indices.type';

export interface MethodMetadata {
  httpMethod: HttpMethod;
  path: string;
  argumentIndices: ArgumentIndices;
  middlewares?: RequestHandler[];
  defaultHttpStatus?: number;
  headers?: Headers;
}
