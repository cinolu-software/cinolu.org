import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const noAuthGuard: CanActivateFn | CanActivateChildFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkAuth().pipe(
    switchMap((authenticated) => {
      if (authenticated) return of(router.parseUrl(''));
      return of(true);
    })
  );
};
