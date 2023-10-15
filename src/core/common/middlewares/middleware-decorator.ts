import { RequestHandler } from 'express';
import { Constructible } from '../../interfaces/constructible.interface';
import { USE_MIDDLEWARES_METADATA } from './middlewares-constants';

function UseMiddlewares(...middlewares: RequestHandler[]): ClassDecorator & MethodDecorator {
  return function (target: Constructible | any, key?: string | symbol) {
    const metadataKey = USE_MIDDLEWARES_METADATA;

    if (key) {
      Reflect.defineMetadata(metadataKey, middlewares, target, key);
    } else {
      Reflect.defineMetadata(metadataKey, middlewares, target);
    }
  };
}

export { UseMiddlewares };
