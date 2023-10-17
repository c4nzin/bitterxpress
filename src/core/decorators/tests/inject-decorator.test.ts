import 'reflect-metadata';
import { Inject } from '../inject.decorator';
import { INJECT_TOKEN_METADATA } from '../../enums';

describe('Inject', () => {
  it('should add the token to metadata', () => {
    // Arrange
    const target = {};
    const key = 'exampleKey';
    const token = 'exampleToken';
    const index = 0;

    // Act
    Inject(token)(target, key, index);

    // Assert
    const injectTokens = Reflect.getMetadata(INJECT_TOKEN_METADATA.INJECT_TOKEN, target, key);

    expect(injectTokens).toBeDefined();
    expect(injectTokens[index]).toBe(token);
  });
});
