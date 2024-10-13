import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../services';

export function authGuard(): CanActivateFn {
  return (): Observable<boolean> => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    return userService.getUserAsObservable().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/login']);
        return [false];
      })
    );
  };
}
