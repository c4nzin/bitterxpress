import { DependencyContainer } from '../../container/dependency.container';
import { Injectable } from '../injectable.decorator';
import 'reflect-metadata';

describe('Injectable', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should register the class token as a dependency when not a singleton', () => {
    // Arrange
    const targetClass = class TestClass {};
    const injectableOptions = { singleton: false };

    const registerClassTokenDependencyMock = jest.spyOn(
      DependencyContainer,
      'registerClassTokenDependency',
    );

    // Act
    Injectable(injectableOptions)(targetClass);

    // Assert
    expect(registerClassTokenDependencyMock).toHaveBeenCalledWith(targetClass);
  });

  it('should not register the class token as a dependency when it is a singleton', () => {
    // Arrange
    const targetClass = class TestClass {};
    const injectableOptions = { singleton: true };

    const registerClassTokenDependencyMock = jest.spyOn(
      DependencyContainer,
      'registerClassTokenDependency',
    );

    // Act
    Injectable(injectableOptions)(targetClass);

    // Assert
    expect(registerClassTokenDependencyMock).not.toHaveBeenCalled();
  });
});
