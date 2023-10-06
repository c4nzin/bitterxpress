import { HttpMethod } from '../enums/http-methods.enum';
import { httpMethodDecoratorFactory } from './http.factory';

export const GET = httpMethodDecoratorFactory(HttpMethod.Get);
export const POST = httpMethodDecoratorFactory(HttpMethod.Post);
export const PUT = httpMethodDecoratorFactory(HttpMethod.Put);
export const TRACE = httpMethodDecoratorFactory(HttpMethod.Trace);
export const PATCH = httpMethodDecoratorFactory(HttpMethod.Patch);
export const CONNECT = httpMethodDecoratorFactory(HttpMethod.Connect);
export const DELETE = httpMethodDecoratorFactory(HttpMethod.Delete);
export const HEAD = httpMethodDecoratorFactory(HttpMethod.Head);
export const OPTIONS = httpMethodDecoratorFactory(HttpMethod.Options);
