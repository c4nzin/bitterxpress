import { ControllerMetadataKey } from '../enums';

export function Controller(route: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(ControllerMetadataKey.ROUTE, route, target);
  };
}
