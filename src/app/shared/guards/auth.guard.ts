import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const user = inject(AuthStore).user();
  const router = inject(Router);
  const redirectUrl = state.url;

  if (user) return true;
  router.navigate(['/sign-in'], {
    queryParams: { redirectUrl }
  });
  return false;
};
