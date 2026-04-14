import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Global HTTP error interceptor.
 * Logs errors to the console and re-throws them so individual services
 * can add context-specific handling.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          console.error('[HTTP] Network error — cannot reach backend:', err.message);
        } else {
          console.error(`[HTTP] ${err.status} ${err.statusText} on ${req.url}`);
        }
        return throwError(() => err);
      }),
    );
  }
}
