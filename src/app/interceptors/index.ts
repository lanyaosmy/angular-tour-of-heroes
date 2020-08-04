import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
import { LoggingInterceptor } from './logging-interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true, // HTTP_INTERCEPTORS 是一个多重提供者的令牌，表示它会注入一个多值的数组，而不是单一的值。
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true,
  },
];
