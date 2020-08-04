import { finalize, tap } from 'rxjs/operators';

import { MessageService } from '../services/message.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private message: MessageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    return next.handle(req).pipe(
      tap(
        (event) => (ok = event instanceof HttpResponse ? 'success' : ''),
        (error) => (ok = 'failed')
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        this.message.add(msg);
      })
    );
  }
}
