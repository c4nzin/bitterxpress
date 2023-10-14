import { LifecycleHookMetadataKey } from '../../core/enums/lifecycle-hooks.enum';
import { lifecycleHookDecoratorFactory } from './lifecycle-hook.decorator.factory';

export const BeforeGlobalMiddlewaresBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.BEFORE_MIDDLEWARES_BOUND,
);
export const AfterGlobalMiddlewaresBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_MIDDLEWARES_BOUND,
);
export const BeforeRoutesBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.BEFORE_ROUTES_BOUND,
);
export const AfterRoutesBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_ROUTES_BOUND,
);
export const BeforeListenStarted = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.BEFORE_LISTEN_STARTED,
);
export const AfterListenStarted = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_LISTEN_STARTED,
);
