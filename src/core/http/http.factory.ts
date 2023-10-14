import { HttpMethodMetadataKey } from '../enums';
import { HttpMethods } from '../enums/http-methods.enum';

export function httpMethodDecoratorFactory(method: HttpMethods) {
  return function (path?: string): MethodDecorator {
    return function (target: any, key: string | symbol) {
      Reflect.defineMetadata(HttpMethodMetadataKey.METHOD, method, target, key);
      Reflect.defineMetadata(HttpMethodMetadataKey.PATH, path, target, key);
    };
  };
}
