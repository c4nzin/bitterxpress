import express, { RequestHandler } from 'express';
import { Logger } from '../../logger';
import { Constructible } from '../../core/interfaces';
import { DependencyContainer } from '../dependency.container';
import { AppProperties } from '../../core/interfaces/app-properties.interface';
import { EXPRESS_APP_INSTANCE_TOKEN } from '../../core/decorators/express-app-instance.decorator';
import { AppMetadata } from '../../core/interfaces/app-metadata.interface';

export class BootsTrapService {
  private appInstance: any;
  private readonly expressApp: express.Express;
  private readonly logger: Logger;

  constructor(
    private readonly appClass: Constructible,
    private readonly appProperties: AppProperties,
  ) {
    this.expressApp = express();
    this.logger = DependencyContainer.get(Logger);
  }

  public bootstrap() {
    this.appProperties.customProviders = [
      ...(this.appProperties.customProviders || []),
      {
        token: EXPRESS_APP_INSTANCE_TOKEN,
        instance: this.expressApp,
      },
    ];

    this.registerCustomProviders(this.appProperties.customProviders);
    this.appInstance = DependencyContainer.get(this.appClass);

    const appMetadata: AppMetadata = this.getAppMetadata();

    if (appMetadata.beforeGlobalMiddlewaresBoundMethodKey) {
      this.appInstance[appMetadata.beforeGlobalMiddlewaresBoundMethodKey]();
    }

    this.expressApp.use(express.json());

    this.appProperties.useGlobalMiddlewares?.forEach((middleware: RequestHandler) =>
      this.expressApp.use(middleware),
    );

    if (appMetadata.afterGlobalMiddlewaresBoundMethodKey) {
      this.appInstance[appMetadata.afterGlobalMiddlewaresBoundMethodKey]();
    }

    if (this.appProperties.controllers) {
      this.registerControllers(this.appProperties.controllers);
    }

    if (appMetadata.afterRoutesBoundMethodKey) {
      this.appInstance[appMetadata.afterRoutesBoundMethodKey]();
    }
    if (appMetadata.beforeListenStartedMethodKey) {
      this.appInstance[appMetadata.beforeListenStartedMethodKey]();
    }

    this.expressApp.listen(this.appProperties.port);

    if (appMetadata.afterListenStartedMethodKey) {
      this.appInstance[appMetadata.afterListenStartedMethodKey]();
    }
  }
}
