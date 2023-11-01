import { DependencyContainer } from './dependency.container';
import 'reflect-metadata';

describe('DependencyContainer', () => {
  afterEach(() => {
    DependencyContainer['dependencies'].clear();
  });

  it('should register and retrieve a dependency', () => {
    // Arrange
    const exampleDependency = 'Example Dependency';

    // Act
    DependencyContainer.registerDependency('exampleToken', exampleDependency);
    const retrievedDependency = DependencyContainer.get('exampleToken');

    // Assert
    expect(retrievedDependency).toBe(exampleDependency);
  });

  it('should resolve a class dependency with no constructor parameters', () => {
    // Arrange
    class ExampleClass {}
    DependencyContainer.registerDependency(ExampleClass);

    // Act
    const resolvedInstance = DependencyContainer.resolve(ExampleClass);

    // Assert
    expect(resolvedInstance).toBeInstanceOf(ExampleClass);
  });

  it('should resolve a class dependency with constructor parameters', () => {
    // Arrange
    class DependencyA {}
    class DependencyB {}

    class ExampleClass {
      constructor(a: DependencyA, b: DependencyB) {}
    }

    DependencyContainer.registerDependency(DependencyA);
    DependencyContainer.registerDependency(DependencyB);
    DependencyContainer.registerDependency(ExampleClass);

    // Act
    const resolvedInstance = DependencyContainer.resolve(ExampleClass);

    // Assert
    expect(resolvedInstance).toBeInstanceOf(ExampleClass);
  });

  it('should throw an error when resolving an unknown token', () => {
    // Act & Assert
    expect(() => DependencyContainer.resolve('unknownToken')).toThrowError(
      'DependencyContainer: Unknown token identifier',
    );
  });
});
