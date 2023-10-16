import { LifecycleHookMetadataKey } from '../../../core';
import { lifecycleHookDecoratorFactory } from '../factories/lifecycle-hook.decorator.factory';

export const BeforeListenStarted = lifecycleHookDecoratorFactory(
  LifecycleHookMetadataKey.AFTER_LISTEN_STARTED,
);
