import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/dashboard');
        return false;
      }
    }),
    catchError(() => of(true))
  );
};
