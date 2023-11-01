import { DependencyInjectionMetadataKey } from '../enums/injection-enums/depedency-injection-keys.enum';
import { Constructible } from '../interfaces/constructible.interface';
import { Token } from '../types/token.type';

export class DependencyContainer {
  private static readonly dependencies: Map<Token, any> = new Map();

  public static get<T = any>(token: Token<T>): T {
    if (!DependencyContainer.dependencies.has(token)) {
      DependencyContainer.registerDependency(token);
    }

    return DependencyContainer.dependencies.get(token);
  }

  public static resolve<T>(token: Token<T>): T {
    if (typeof token === 'string') throw new Error('DependencyContainer: Unknown token identifier');

    const constructorParamTypes: Constructible[] = Reflect.getMetadata(
      DependencyInjectionMetadataKey.PARAMTYPES,
      token,
    );

    const injectTokens: Token[] = Reflect.getMetadata(
      DependencyInjectionMetadataKey.INJECT_TOKENS,
      token,
    );

    if (!constructorParamTypes || constructorParamTypes.length === 0) {
      return new token();
    }

    const constructorParamInstances: Constructible[] = constructorParamTypes.map(
      (paramType, index) => {
        const injectToken: Token = (injectTokens && injectTokens[index]) || paramType;

        if (!injectToken) {
          throw new Error(
            `DependencyContainer: Unable to resolve dependency of ${token} at index ${index}`,
          );
        }

        return DependencyContainer.get(injectToken);
      },
    );

    return new token(...constructorParamInstances);
  }

  public static registerDependency<T = any>(token: Constructible<T> | string, instance?: any) {
    DependencyContainer.dependencies.set(token, instance);
    if (typeof token === 'string') {
      return DependencyContainer.dependencies.set(token, instance);
    }

    return DependencyContainer.dependencies.set(token, instance);
  }
}
