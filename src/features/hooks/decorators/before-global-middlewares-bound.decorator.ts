import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const BeforeGlobalMiddlewaresBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.BEFORE_MIDDLEWARES_BOUND,
);
