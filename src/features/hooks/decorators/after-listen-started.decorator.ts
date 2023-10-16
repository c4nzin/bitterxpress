import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const AfterListenStarted = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_LISTEN_STARTED,
);
