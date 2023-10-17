import { RequestHandler } from 'express';
import { Constructible } from '../../../interfaces/constructible.interface';
import { USE_MIDDLEWARES_METADATA } from '../../constants/middlewares-constants';

export function RegisterMiddlewares(...getmw: RequestHandler[]): ClassDecorator & MethodDecorator {
  return function (target: Constructible | any, key?: string | symbol) {
    const metadataKey = USE_MIDDLEWARES_METADATA;

    if (key) {
      Reflect.defineMetadata(metadataKey, getmw, target, key);
    } else {
      Reflect.defineMetadata(metadataKey, getmw, target);
    }
  };
}
