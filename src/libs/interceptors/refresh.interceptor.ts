/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY } from '../helpers';
import { AuthService } from '../services';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (
          error.status === HttpStatusCode.Unauthorized &&
          !req.url.includes('api/auth/refresh') &&
          accessToken
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((tokenResponse) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.value);
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: tokenResponse.value,
          },
        });

        return next.handle(clonedReq);
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
