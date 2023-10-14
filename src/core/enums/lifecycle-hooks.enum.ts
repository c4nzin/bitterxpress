export enum LifecycleHookMetadataKey {
  BEFORE_MIDDLEWARES_BOUND = 'lifecyclehook:before-middlewares',
  AFTER_MIDDLEWARES_BOUND = 'lifecyclehook:after-middlewares',
  BEFORE_ROUTES_BOUND = 'lifecyclehook:before-routes',
  AFTER_ROUTES_BOUND = 'lifecyclehook:after-routes',
  BEFORE_LISTEN_STARTED = 'lifecyclehook:before-listen',
  AFTER_LISTEN_STARTED = 'lifecyclehook:after-listen',
}
