import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../store/auth/auth.reducers';
import { IUser } from '../utils/types/models.type';

export const authGuard: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  const user: Observable<IUser | null> = store.pipe(select(selectUser));

  return user.pipe(
    tap((currentUser) => {
      const isAuthenticated = !!currentUser;
      if (!isAuthenticated) {
        const redirectUrl = state.url;
        router.navigate(['/sign-in'], {
          queryParams: { redirectUrl }
        });
      }
    }),
    map((currentUser) => !!currentUser)
  );
};
