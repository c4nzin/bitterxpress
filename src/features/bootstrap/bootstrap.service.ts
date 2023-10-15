import express, { Request, RequestHandler, Response, Router } from 'express';
import { Logger } from '../logger';
import {
  AppMetadata,
  AppProperties,
  Constructible,
  ControllerMetadata,
  MethodMetadata,
} from '../../core/interfaces';
import { DependencyContainer } from '../dependency.container';
import {
  ArgumentIndices,
  ControllerMetadataKey,
  CustomProvider,
  DefaultHttpStatusMetadataKey,
  EXPRESS_APP_INSTANCE_TOKEN,
  HttpMethodMetadataKey,
  HttpMethods,
  LifecycleHookMetadataKey,
  MethodArgumentMetadataKey,
  MiddlewareMetadataKey,
  ResponseHeadersMetadataKey,
} from '../../core';

interface Headers {
  [P: string]: any;
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

  bootstrap() {
    this.appProperties.customProviders = [
      ...(this.appProperties.customProviders || []),
      { token: EXPRESS_APP_INSTANCE_TOKEN, instance: this.expressApp },
    ];
    this.registerCustomProviders(this.appProperties.customProviders);
    this.appInstance = DependencyContainer.get(this.appClass);
    const appMetadata: AppMetadata = this.getAppMetadata();
    // execute before hook
    if (appMetadata.beforeGlobalMiddlewaresBoundMethodKey) {
      this.appInstance[appMetadata.beforeGlobalMiddlewaresBoundMethodKey]();
    }
    // start middleware bind
    this.expressApp.use(express.json());
    this.appProperties.useGlobalMiddlewares?.forEach((middleware: RequestHandler) => {
      this.expressApp.use(middleware);
    });
    // end middleware bind
    // execute after hook
    if (appMetadata.afterGlobalMiddlewaresBoundMethodKey) {
      this.appInstance[appMetadata.afterGlobalMiddlewaresBoundMethodKey]();
    }
    // execute before hook
    if (appMetadata.beforeRoutesBoundMethodKey) {
      this.appInstance[appMetadata.beforeRoutesBoundMethodKey]();
    }
    // start route bind
    if (this.appProperties.controllers) {
      this.registerControllers(this.appProperties.controllers);
    }
    // end route bind
    // execute after hook
    if (appMetadata.afterRoutesBoundMethodKey) {
      this.appInstance[appMetadata.afterRoutesBoundMethodKey]();
    }
    // execute before hook
    if (appMetadata.beforeListenStartedMethodKey) {
      this.appInstance[appMetadata.beforeListenStartedMethodKey]();
    }
    // start listen
    this.expressApp.listen(this.appProperties.port);
    // end of start of listen
    // execute after hook
    if (appMetadata.afterListenStartedMethodKey) {
      this.appInstance[appMetadata.afterListenStartedMethodKey]();
    }
  }

  private getAppMetadata(): AppMetadata {
    const beforeGlobalMiddlewaresBoundMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.BEFORE_MIDDLEWARES_BOUND,
      this.appClass.prototype,
    );
    const afterGlobalMiddlewaresBoundMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.AFTER_MIDDLEWARES_BOUND,
      this.appClass.prototype,
    );
    const beforeRoutesBoundMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.BEFORE_ROUTES_BOUND,
      this.appClass.prototype,
    );
    const afterRoutesBoundMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.AFTER_ROUTES_BOUND,
      this.appClass.prototype,
    );
    const beforeListenStartedMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.BEFORE_LISTEN_STARTED,
      this.appClass.prototype,
    );
    const afterListenStartedMethodKey: string = Reflect.getMetadata(
      LifecycleHookMetadataKey.AFTER_LISTEN_STARTED,
      this.appClass.prototype,
    );
    return {
      beforeGlobalMiddlewaresBoundMethodKey,
      afterGlobalMiddlewaresBoundMethodKey,
      beforeRoutesBoundMethodKey,
      afterRoutesBoundMethodKey,
      beforeListenStartedMethodKey,
      afterListenStartedMethodKey,
    };
  }

  private registerControllers(controllers: Constructible[]) {
    controllers.forEach((controller: Constructible) => {
      this.registerController(controller);
    });
  }

  private registerCustomProviders(providers: CustomProvider[]) {
    providers.forEach((provider: CustomProvider) => {
      if (typeof provider.token === 'string') {
        DependencyContainer.registerStringTokenDependency(provider.token, provider.instance);
      } else {
        DependencyContainer.registerClassTokenDependency(provider.token, provider.instance);
      }
    });
  }

  private registerController(controllerClass: Constructible) {
    const controllerMetadata: ControllerMetadata = this.getControllerMetadata(controllerClass);
    const controller: any = DependencyContainer.get(controllerClass);
    const keys: string[] = Object.keys(controllerClass.prototype);
    const router: Router = express.Router();
    if (controllerMetadata.middlewares) {
      router.use(controllerMetadata.middlewares);
    }
    keys.forEach((key: string) => {
      const methodMetadata: MethodMetadata | undefined = this.getMethodMetadata(
        controllerClass,
        key,
      );
      if (methodMetadata) {
        const handler: Function = controller[key].bind(controller);
        const headers: any = {
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
          headers,
        );
        this.logger.info(
          `Mapped ${methodMetadata.httpMethod.toUpperCase()} ${controllerMetadata.route}${
            methodMetadata.path
          }`,
        );
      }
    });
    this.expressApp.use(controllerMetadata.route, router);
  }

  private getControllerMetadata(controller: Constructible): ControllerMetadata {
    const route: string = Reflect.getMetadata(ControllerMetadataKey.ROUTE, controller);
    const defaultHttpStatus: number | undefined = Reflect.getMetadata(
      DefaultHttpStatusMetadataKey.DEFAULT_HTTP_STATUS,
      controller,
    );
    const headers: Headers = Reflect.getMetadata(ResponseHeadersMetadataKey.HEADERS, controller);
    const middlewares: RequestHandler[] = Reflect.getMetadata(
      MiddlewareMetadataKey.USE_MIDDLEWARES,
      controller,
    );
    return { route, middlewares, defaultHttpStatus, headers };
  }

  private getMethodMetadata(
    controller: Constructible,
    methodKey: string,
  ): MethodMetadata | undefined {
    const httpMethod: HttpMethods = Reflect.getMetadata(
      HttpMethodMetadataKey.METHOD,
      controller.prototype,
      methodKey,
    );
    if (httpMethod) {
      const path: string =
        Reflect.getMetadata(HttpMethodMetadataKey.PATH, controller.prototype, methodKey) || '';
      const defaultHttpStatus: number = Reflect.getMetadata(
        DefaultHttpStatusMetadataKey.DEFAULT_HTTP_STATUS,
        controller.prototype,
        methodKey,
      );
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(
          MiddlewareMetadataKey.USE_MIDDLEWARES,
          controller.prototype,
          methodKey,
        ) || [];
      const headers: any = Reflect.getMetadata(
        ResponseHeadersMetadataKey.HEADERS,
        controller.prototype,
        methodKey,
      );
      const argumentIndices: ArgumentIndices = this.getArgumentIndices(
        controller.prototype,
        methodKey,
      );
      return { httpMethod, path, defaultHttpStatus, middlewares, argumentIndices, headers };
    }
    return undefined;
  }

  private registerHandler(
    router: Router,
    method: HttpMethods,
    path: string,
    middlewares: RequestHandler[],
    handler: Function,
    argumentIndices: ArgumentIndices,
    defaultHttpStatus?: number,
    headers?: Headers,
  ) {
    const expressHandler: RequestHandler = async (req: Request, res: Response) => {
      const args: any[] = [];
      if (argumentIndices[MethodArgumentMetadataKey.BODY] != null) {
        args[argumentIndices[MethodArgumentMetadataKey.BODY] as number] = req.body;
      }
      if (argumentIndices[MethodArgumentMetadataKey.QUERY] != null) {
        args[argumentIndices[MethodArgumentMetadataKey.QUERY] as number] = req.query;
      }
      if (argumentIndices[MethodArgumentMetadataKey.PARAMS] != null) {
        args[argumentIndices[MethodArgumentMetadataKey.PARAMS] as number] = req.params;
      }
      if (argumentIndices[MethodArgumentMetadataKey.REQUEST] != null) {
        args[argumentIndices[MethodArgumentMetadataKey.REQUEST] as number] = req;
      }
      if (argumentIndices[MethodArgumentMetadataKey.RESPONSE] != null) {
        args[argumentIndices[MethodArgumentMetadataKey.RESPONSE] as number] = res;
      }
      if (defaultHttpStatus) {
        res.status(defaultHttpStatus);
      }
      if (headers) {
        res.set(headers);
      }
      const response: any = await handler(...args);
      res.send(response);
    };
    const handlers: RequestHandler[] = [...middlewares, expressHandler];
    router[method](path, ...handlers);
  }

  private getArgumentIndices(target: any, methodKey: string): ArgumentIndices {
    const indices: ArgumentIndices = {};
    Object.values(MethodArgumentMetadataKey).forEach((key: string) => {
      indices[key as MethodArgumentMetadataKey] = Reflect.getMetadata(key, target, methodKey);
    });
    return indices;
  }
}
