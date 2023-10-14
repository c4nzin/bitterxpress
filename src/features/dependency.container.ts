import 'reflect-metadata';
import { DependencyInjectionMetadataKey } from '../core/enums/depedency-injection-keys.enum';
import { Constructible } from '../core/interfaces/constructible.interface';
import { Token } from '../core/types/token.type';

class DependencyContainer {
  private static readonly dependencies: Map<Token, any> = new Map();

  static get<T = any>(token: Token<T>): T {
    if (!DependencyContainer.dependencies.has(token)) {
      const instance: T = DependencyContainer.resolve(token);
      DependencyContainer.dependencies.set(token, instance);
    }

    return DependencyContainer.dependencies.get(token);
  }

  static resolve<T>(token: Token<T>): T {
    if (typeof token === 'string') throw 'Unknown token identifier';

    const constructorParamTypes: any[] = Reflect.getMetadata(
      DependencyInjectionMetadataKey.PARAMTYPES,
      token,
    );

    const injectTokens: Token[] = Reflect.getMetadata(
      DependencyInjectionMetadataKey.INJECT_TOKENS,
      token,
    );

    if (!constructorParamTypes || !constructorParamTypes.length) {
      return new token();
    }

    const constructorParamInstances: any[] = constructorParamTypes.map((paramType, index) => {
      const injectToken: Token = (injectTokens && injectTokens[index]) || paramType;

      if (!injectToken) {
        throw `Cannot resolve dependency of ${token} at index ${index}`;
      }

      return DependencyContainer.get(injectToken);
    });

    return new token(...constructorParamInstances);
  }

  static registerStringTokenDependency(token: string, instance: any) {
    DependencyContainer.registerDependency(token, instance);
  }
  static registerClassTokenDependency<T>(token: Constructible<T>, instance?: any) {
    DependencyContainer.registerDependency(token, instance);
  }

  static registerDependency<T = any>(token: Constructible<T> | string, instance?: any) {
    DependencyContainer.dependencies.set(token, instance);
  }
}

export { DependencyContainer };
