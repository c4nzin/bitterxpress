import 'reflect-metadata';
import { AppProperties } from '../interfaces/app-properties.interface';
import { BootsTrapService } from '../../features/bootstrap/bootstrap.service';

function App(properties: AppProperties): ClassDecorator {
  return function (target: any) {
    const bootstrapService = new BootsTrapService(target, properties);
    bootstrapService.bootstrap();
  };
}

export { App };
