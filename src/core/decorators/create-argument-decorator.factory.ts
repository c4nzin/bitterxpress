export function createArgumentDecorator(metadataKey: string) {
  return (target: any, key: string | symbol, index: number) => {
    const existingIndexes = Reflect.getMetadata(metadataKey, target, key) || [];
    existingIndexes.push(index);
    Reflect.defineMetadata(metadataKey, existingIndexes, target, key);
  };
}
