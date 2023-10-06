import { RequestHandler } from 'express';
import 'reflect-metadata';
import { Constructible } from '../core/interfaces/constructible.interface';

const USE_MIDDLEWARES_METADATA = 'use:middlewares';

export function UseMiddlewares(...middlewares: RequestHandler[]): ClassDecorator & MethodDecorator {
  return function (target: Constructible | any, key?: string | symbol) {
    if (key) Reflect.defineMetadata(USE_MIDDLEWARES_METADATA, middlewares, target, key);
    else Reflect.defineMetadata(USE_MIDDLEWARES_METADATA, middlewares, target);
  };
}
