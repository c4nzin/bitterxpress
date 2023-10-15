import { DEFAULT_HTTP_STATUS_TOKEN } from './http-status.constant';

export function DefaultHttpStatus(code: number): ClassDecorator & MethodDecorator {
  return function (target: any, key?: string | symbol) {
    if (key) Reflect.defineMetadata(DEFAULT_HTTP_STATUS_TOKEN, code, target, key);
    else Reflect.defineMetadata(DEFAULT_HTTP_STATUS_TOKEN, code, target);
  };
}
