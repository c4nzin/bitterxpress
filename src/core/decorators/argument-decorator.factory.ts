import { MethodArgumentMetadataKey } from '../enums/method-arguments.enum';

export function argumentDecoratorFactory(metadataKey: string) {
  return function (): any {
    return function (target: any, key: string | symbol, index: number) {
      Reflect.defineMetadata(metadataKey, index, target, key);
    };
  };
}

export const RequestBody = argumentDecoratorFactory(MethodArgumentMetadataKey.BODY);
export const RequestParams = argumentDecoratorFactory(MethodArgumentMetadataKey.PARAMS);
export const RequestQuery = argumentDecoratorFactory(MethodArgumentMetadataKey.QUERY);
export const Request = argumentDecoratorFactory(MethodArgumentMetadataKey.REQUEST);
export const Response = argumentDecoratorFactory(MethodArgumentMetadataKey.RESPONSE);
