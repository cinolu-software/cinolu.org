import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.authenticate().pipe(
    map((user) => !!user),
    catchError(() => {
      return of(false);
    })
  );
};
