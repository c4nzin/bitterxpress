import 'reflect-metadata';
import { InjectExpressAppInstance } from '../express-app-instance.decorator';
import { EXPRESS_APP_INSTANCE_TOKEN } from '../constants/express-app-instance.constant';
import { INJECT_TOKEN_METADATA } from '../../enums';

describe('InjectExpressAppInstance', () => {
  it('should add the correct token to metadata', () => {
    // Arrange
    class TestClass {
      constructor(app: any) {}
    }

    // Act
    InjectExpressAppInstance()(TestClass.prototype, 'constructor', 0);

    // Assert
    const injectTokens = Reflect.getMetadata(
      INJECT_TOKEN_METADATA.INJECT_TOKEN,
      TestClass.prototype,
      'constructor',
    );

    expect(injectTokens).toBeDefined();
    expect(injectTokens[0]).toBe(EXPRESS_APP_INSTANCE_TOKEN);
  });
});
