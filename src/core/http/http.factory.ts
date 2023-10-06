import { HttpMethod } from '../enums/http-methods.enum';

const METHOD_TOKEN = 'method';
const PATH_TOKEN = 'path';

export function httpMethodDecoratorFactory(method: HttpMethod) {
  return function (path?: string): MethodDecorator {
    return function (target: any, key: string | symbol) {
      Reflect.defineMetadata(METHOD_TOKEN, method, target, key);
      Reflect.defineMetadata(PATH_TOKEN, path, target, key);
    };
  };
}
