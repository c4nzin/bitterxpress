import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const AfterGlobalMiddlewaresBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_MIDDLEWARES_BOUND,
);
