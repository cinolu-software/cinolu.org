import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { catchError, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { authActions } from '../data-access/auth.actions';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const store = inject(Store);

  return authService.authenticate().pipe(
    map((user) => {
      store.dispatch(authActions.authenticateUser({ user }));
      return true;
    }),
    catchError(() => {
      return [false];
    })
  );
};
