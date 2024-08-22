import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../data-access/auth.reducers';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const user$ = store.select(selectUser);

  return user$.pipe(
    map((user) => !!user),
    catchError(() => {
      router.navigate(['/sign-in']);
      return of(false);
    })
  );
};
