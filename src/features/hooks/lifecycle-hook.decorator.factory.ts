export function lifecycleHookDecoratorFactory(metadataKey: string): Function {
  return function (): MethodDecorator {
    return function (target: any, key: string | symbol) {
      Reflect.defineMetadata(metadataKey, key, target);
    };
  };
}
