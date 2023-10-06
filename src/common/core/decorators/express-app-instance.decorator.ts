const EXPRESS_APP_INSTANCE_TOKEN = 'express-app';

export function InjectExpressAppInstance(): ParameterDecorator {
  return Inject(EXPRESS_APP_INSTANCE_TOKEN);
}
