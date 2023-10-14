export function argumentDecoratorFactory(metadataKey: string) {
  return function (target: any, key: string | symbol, index: number) {
    Reflect.defineMetadata(metadataKey, index, target, key);
  };
}
