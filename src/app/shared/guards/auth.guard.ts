import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../store/auth/auth.reducers';
import { IUser } from '../utils/types/models.type';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const user: Observable<IUser | null> = store.pipe(select(selectUser));
  let isAuthenticated = false;

  const subscription = user.subscribe((currentUser) => {
    isAuthenticated = !!currentUser;
    if (!isAuthenticated) router.navigate(['/sign-in']);
  });

  subscription.unsubscribe();
  return isAuthenticated;
};
