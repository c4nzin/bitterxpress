import { InjectableOptions } from '../interfaces/injectable-options.interface';

export function Injectable(injectableOptions?: InjectableOptions): ClassDecorator {
  return function (target: any) {
    if (injectableOptions?.singleton === false) {
      //   DependencyContainer.registerBlbalbla(target); not working
    }
  };
}

//Issue: Create Dependency Container
