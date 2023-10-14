import { MethodArgumentMetadataKey } from '../enums';
import { argumentDecoratorFactory } from './argument-decorator.factory';

export const RequestBody = argumentDecoratorFactory(MethodArgumentMetadataKey.BODY);
export const RequestParams = argumentDecoratorFactory(MethodArgumentMetadataKey.PARAMS);
export const RequestQuery = argumentDecoratorFactory(MethodArgumentMetadataKey.QUERY);
export const Request = argumentDecoratorFactory(MethodArgumentMetadataKey.REQUEST);
export const Response = argumentDecoratorFactory(MethodArgumentMetadataKey.RESPONSE);
