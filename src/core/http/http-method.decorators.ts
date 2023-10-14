import { HttpMethods } from '../enums/http-method-enums/http-methods.enum';
import { httpMethodDecoratorFactory } from './http.factory';

export const Get = httpMethodDecoratorFactory(HttpMethods.Get);
export const Post = httpMethodDecoratorFactory(HttpMethods.Post);
export const Put = httpMethodDecoratorFactory(HttpMethods.Put);
export const Trace = httpMethodDecoratorFactory(HttpMethods.Trace);
export const Patch = httpMethodDecoratorFactory(HttpMethods.Patch);
export const Connect = httpMethodDecoratorFactory(HttpMethods.Connect);
export const Delete = httpMethodDecoratorFactory(HttpMethods.Delete);
export const Head = httpMethodDecoratorFactory(HttpMethods.Head);
export const Options = httpMethodDecoratorFactory(HttpMethods.Options);
