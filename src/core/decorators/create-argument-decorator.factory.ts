export function createArgumentDecorator(metadataKey: string) {
  return (target: any, key: string | symbol, index: number) => {
    Reflect.defineMetadata(metadataKey, index, target, key);
  };
}
