import 'reflect-metadata';
import { DependencyInjectionMetadataKey } from '../enums';

export function Inject(token: string): any {
  return function (target: any, key: string | symbol, index: number) {
    const injectTokens: { [P: number]: string } =
      Reflect.getMetadata(DependencyInjectionMetadataKey.INJECT_TOKENS, target, key) || {};
    injectTokens[index] = token;
    Reflect.defineMetadata(DependencyInjectionMetadataKey.INJECT_TOKENS, injectTokens, target, key);
  };
}
