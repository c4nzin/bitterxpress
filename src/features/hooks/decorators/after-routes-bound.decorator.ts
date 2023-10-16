import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const AfterRoutesBound = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_ROUTES_BOUND,
);
