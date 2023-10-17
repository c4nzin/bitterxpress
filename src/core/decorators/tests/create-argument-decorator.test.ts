import 'reflect-metadata';
import { createArgumentDecorator } from '../create-argument-decorator.factory';

describe('createArgumentDecorator', () => {
  it('should set argument metadata on the decorated class method', () => {
    // Arrange
    const metadataKey = 'customArgMetadata';
    const index = 1;

    class TestClass {
      public testMethod(
        arg1: string,
        @createArgumentDecorator(metadataKey) arg2: number,
        arg3: boolean,
      ) {}
    }

    // Act
    const argIndexes = Reflect.getMetadata(metadataKey, TestClass.prototype, 'testMethod');

    // Assert
    expect(argIndexes).toEqual([index]);
  });
});
