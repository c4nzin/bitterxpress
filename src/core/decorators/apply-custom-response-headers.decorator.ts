import { ResponseHeadersMetadataKey } from '../enums/header-enums/response-headers.enum';
import { Headers } from '../../features';

export function ApplyCustomResponseHeaders(headers: Headers): ClassDecorator & MethodDecorator {
  return function (target: any, key?: string | symbol) {
    if (key) Reflect.defineMetadata(ResponseHeadersMetadataKey.HEADERS, headers, target, key);
    else Reflect.defineMetadata(ResponseHeadersMetadataKey.HEADERS, headers, target);
  };
}
