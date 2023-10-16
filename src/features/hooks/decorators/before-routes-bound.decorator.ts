import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const BeforeRoutesBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.BEFORE_ROUTES_BOUND,
);
