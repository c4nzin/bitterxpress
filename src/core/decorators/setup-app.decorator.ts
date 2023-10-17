import { AppProperties } from '../interfaces/app-interfaces/app-properties.interface';
import { BootstrapService } from '../../features/bootstrap/bootstrap.service';

export function SetupApp(properties: AppProperties): ClassDecorator {
  return function (target: any) {
    const bootstrapService = new BootstrapService(target, properties);
    bootstrapService.bootstrap();
  };
}
