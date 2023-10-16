import { DependencyContainer } from '../container/dependency.container';
import { InjectableOptions } from '../interfaces/injectable-options.interface';

export function Injectable(injectableOptions?: InjectableOptions): ClassDecorator {
  return function (target: any) {
    if (injectableOptions?.singleton === false) {
      DependencyContainer.registerClassTokenDependency(target);
    }
  };
}
