import { RequestHandler } from 'express';
import 'reflect-metadata';
import { Constructible } from '../../interfaces/constructible.interface';

const USE_MIDDLEWARES_METADATA = 'use:middlewares';

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
