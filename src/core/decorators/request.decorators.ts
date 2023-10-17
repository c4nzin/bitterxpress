import { MethodArgumentMetadataKey } from '../enums';
import { createArgumentDecorator } from './create-argument-decorator.factory';

export const RequestBody = createArgumentDecorator(MethodArgumentMetadataKey.BODY);
export const RequestParams = createArgumentDecorator(MethodArgumentMetadataKey.PARAMS);
export const RequestQuery = createArgumentDecorator(MethodArgumentMetadataKey.QUERY);
export const Request = createArgumentDecorator(MethodArgumentMetadataKey.REQUEST);
export const Response = createArgumentDecorator(MethodArgumentMetadataKey.RESPONSE);
