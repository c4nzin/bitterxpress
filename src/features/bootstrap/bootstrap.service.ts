import express, { RequestHandler, Router, Response, Request } from 'express';
import { Logger } from '../../logger';
import {
  Constructible,
  AppProperties,
  EXPRESS_APP_INSTANCE_TOKEN,
  AppMetadata,
  LifecycleHookMetadataKey,
  CustomProvider,
  ControllerMetadata,
  MethodMetadata,
  ControllerMetadataKey,
  DefaultHttpStatusMetadataKey,
  ResponseHeadersMetadataKey,
  MiddlewareMetadataKey,
  HttpMethods,
  HttpMethodMetadataKey,
  ArgumentIndices,
  MethodArgumentMetadataKey,
} from '../../core';
import { DependencyContainer } from '../dependency.container';

export interface Headers {
  [P: string]: string;
}

export class BootstrapService {
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

  private getAppMetadata(): AppMetadata {
    const metadataKeys: LifecycleHookMetadataKey[] = [
      LifecycleHookMetadataKey.BEFORE_MIDDLEWARES_BOUND,
      LifecycleHookMetadataKey.AFTER_MIDDLEWARES_BOUND,
      LifecycleHookMetadataKey.BEFORE_ROUTES_BOUND,
      LifecycleHookMetadataKey.AFTER_ROUTES_BOUND,
      LifecycleHookMetadataKey.BEFORE_LISTEN_STARTED,
      LifecycleHookMetadataKey.AFTER_LISTEN_STARTED,
    ];

    const metadata: any = {};

    metadataKeys.forEach((key) => {
      metadata[key] = Reflect.getMetadata(key, this.appClass.prototype) || '';
    });

    return metadata;
  }

  private registerControllers(controllers: Constructible[]) {
    controllers.forEach((controllers: Constructible) => this.registerController(controllers));
  }

  private registerCustomProviders(providers: CustomProvider[]) {
    providers.forEach((provider) => {
      typeof provider.token === 'string'
        ? DependencyContainer.registerStringTokenDependency(provider.token, provider.instance)
        : DependencyContainer.registerClassTokenDependency(provider.token, provider.instance);
    });
  }

  private registerController(controllerClass: Constructible) {
    const controllerMetadata: ControllerMetadata = this.getControllerMetadata(controllerClass);
    const controllerInstance: any = DependencyContainer.get(controllerClass);
    const router: Router = express.Router();

    if (controllerMetadata.middlewares) {
      router.use(controllerMetadata.middlewares);
    }

    const controllerMethods: string[] = Object.getOwnPropertyNames(controllerClass.prototype);

    controllerMethods.forEach((methodKey: string) => {
      const methodMetadata: MethodMetadata | undefined = this.getMethodMetadata(
        controllerClass,
        methodKey,
      );

      if (methodMetadata) {
        const handler: Function = controllerInstance[methodKey].bind(controllerInstance);
        const combinedHeaders: any = {
          ...(controllerMetadata.headers || {}),
          ...(methodMetadata.headers || {}),
        };

        this.registerHandler(
          router,
          methodMetadata.httpMethod,
          methodMetadata.path,
          methodMetadata.middlewares || [],
          handler,
          methodMetadata.argumentIndices,
          methodMetadata.defaultHttpStatus || controllerMetadata.defaultHttpStatus,
          combinedHeaders,
        );

        this.logger.info(
          `Mapped ${methodMetadata.httpMethod} ${controllerMetadata.route}${methodMetadata.path}`,
        );
      }
    });

    this.expressApp.use(controllerMetadata.route, router);
  }

  private getControllerMetadata(controller: Constructible): ControllerMetadata {
    return {
      route: Reflect.getMetadata(ControllerMetadataKey.ROUTE, controller) || '',
      defaultHttpStatus: Reflect.getMetadata(
        DefaultHttpStatusMetadataKey.DEFAULT_HTTP_STATUS,
        controller,
      ),
      headers: Reflect.getMetadata(ResponseHeadersMetadataKey.HEADERS, controller) || {},
      middlewares: Reflect.getMetadata(MiddlewareMetadataKey.USE_MIDDLEWARES, controller) || [],
    };
  }

  private getMethodMetadata(
    controller: Constructible,
    methodKey: string,
  ): MethodMetadata | undefined {
    const methodMetadata: MethodMetadata = {
      httpMethod: Reflect.getMetadata(
        HttpMethodMetadataKey.METHOD,
        controller.prototype,
        methodKey,
      ),
      path: Reflect.getMetadata(HttpMethodMetadataKey.PATH, controller.prototype, methodKey) || '',
      defaultHttpStatus: Reflect.getMetadata(
        DefaultHttpStatusMetadataKey.DEFAULT_HTTP_STATUS,
        controller.prototype,
        methodKey,
      ),
      middlewares:
        Reflect.getMetadata(
          MiddlewareMetadataKey.USE_MIDDLEWARES,
          controller.prototype,
          methodKey,
        ) || [],
      headers:
        Reflect.getMetadata(ResponseHeadersMetadataKey.HEADERS, controller.prototype, methodKey) ||
        {},
      argumentIndices: this.getArgumentIndices(controller.prototype, methodKey),
    };

    if (methodMetadata.httpMethod) {
      return methodMetadata;
    }
  }

  private async registerHandler(
    router: Router,
    method: HttpMethods,
    path: string,
    middlewares: RequestHandler[],
    handler: Function,
    argumentIndices: ArgumentIndices,
    defaultHttpStatus?: number,
    headers?: Headers,
  ) {
    router[method](path, ...middlewares, async (req: Request, res: Response) => {
      const args: any[] = [];

      for (const [key, index] of Object.entries(argumentIndices)) {
        if (index !== null) {
          args[index] =
            key === MethodArgumentMetadataKey.RESPONSE ? res : req[key as keyof typeof req];
        }
      }

      if (defaultHttpStatus) {
        res.status(defaultHttpStatus);
      }

      if (headers) {
        for (const [headerName, headerValue] of Object.entries(headers)) {
          res.setHeader(headerName, headerValue);
        }
      }

      const response: any = await handler(...args);
      res.send(response);
    });
  }

  private getArgumentIndices(target: any, methodKey: string): ArgumentIndices {
    const indices: ArgumentIndices = {} as ArgumentIndices;

    for (const key of Object.values(MethodArgumentMetadataKey)) {
      indices[key] = Reflect.getMetadata(key, target, methodKey);
    }

    return indices;
  }
}
