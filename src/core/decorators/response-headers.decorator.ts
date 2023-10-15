import { ResponseHeadersMetadataKey } from '../enums/header-enums/response-headers.enum';

export interface Headers {
  [P: string]: string;
}

export function ResponseHeaders(headers: Headers): ClassDecorator & MethodDecorator {
  return function (target: any, key?: string | symbol) {
    if (key) Reflect.defineMetadata(ResponseHeadersMetadataKey.HEADERS, headers, target, key);
    else Reflect.defineMetadata(ResponseHeadersMetadataKey.HEADERS, headers, target);
  };
}
