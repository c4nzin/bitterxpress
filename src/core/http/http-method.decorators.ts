import { HttpMethod } from '../enums/http-methods.enum';
import { httpMethodDecoratorFactory } from './http.factory';

export const Get = httpMethodDecoratorFactory(HttpMethod.Get);
export const Post = httpMethodDecoratorFactory(HttpMethod.Post);
export const Put = httpMethodDecoratorFactory(HttpMethod.Put);
export const Trace = httpMethodDecoratorFactory(HttpMethod.Trace);
export const Patch = httpMethodDecoratorFactory(HttpMethod.Patch);
export const Connect = httpMethodDecoratorFactory(HttpMethod.Connect);
export const Delete = httpMethodDecoratorFactory(HttpMethod.Delete);
export const Head = httpMethodDecoratorFactory(HttpMethod.Head);
export const Options = httpMethodDecoratorFactory(HttpMethod.Options);
