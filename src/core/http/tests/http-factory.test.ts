import { HttpMethodMetadataKey, HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../http.factory';
import 'reflect-metadata';

describe('httpMethodDecoratorFactory', () => {
  it('should set the method and path metadata on the decorated method', () => {
    // Arrange
    const exampleMethod = HttpMethods.Get;
    const examplePath = '/sample-path';

    class TestClass {
      @httpMethodDecoratorFactory(exampleMethod)(examplePath)
      public testMethod() {}
    }

    // Act
    const methodMetadata = Reflect.getMetadata(
      HttpMethodMetadataKey.METHOD,
      TestClass.prototype,
      'testMethod',
    );
    const pathMetadata = Reflect.getMetadata(
      HttpMethodMetadataKey.PATH,
      TestClass.prototype,
      'testMethod',
    );

    // Assert
    expect(methodMetadata).toBe(exampleMethod);
    expect(pathMetadata).toBe(examplePath);
  });
});
