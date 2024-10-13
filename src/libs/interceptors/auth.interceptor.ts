/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY } from '../helpers';
import { AuthService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: accessToken,
        },
      });
    } else {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 &&
          !req.url.includes('api/auth/refresh') &&
          accessToken
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(() => new Error(error.message || 'Unknown error'));
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
