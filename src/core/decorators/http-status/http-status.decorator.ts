import 'reflect-metadata';

const DEFAULT_HTTP_STATUS_TOKEN = 'default-http-status';

export function HttpStatus(code: number): ClassDecorator & MethodDecorator {
  return function (target: any, key?: string | symbol) {
    if (key) Reflect.defineMetadata(DEFAULT_HTTP_STATUS_TOKEN, code, target, key);
    else Reflect.defineMetadata(DEFAULT_HTTP_STATUS_TOKEN, code, target);
  };
}
