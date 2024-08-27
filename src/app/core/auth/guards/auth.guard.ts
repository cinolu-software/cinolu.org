import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { catchError, mergeMap, of, map } from 'rxjs';
import { authActions } from '../data-access/auth.actions';

export const authGuard: CanActivateFn | CanActivateChildFn = (_, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(
    mergeMap((user) => {
      authActions.authenticateUser({ user });
      return of(true);
    }),
    catchError(() => {
      return of(false);
    })
  );
};
