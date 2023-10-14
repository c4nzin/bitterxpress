import { EXPRESS_APP_INSTANCE_TOKEN } from './constants/express-app-instance.constant';
import { Inject } from './inject.decorator';

export function InjectExpressAppInstance(): ParameterDecorator {
  return Inject(EXPRESS_APP_INSTANCE_TOKEN);
}
