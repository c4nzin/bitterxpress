export function lifecycleHookDecoratorFactory(metadataKey: string) {
  return function (target: any, key: string | symbol) {
    Reflect.defineMetadata(metadataKey, key, target);
  } as MethodDecorator;
}
