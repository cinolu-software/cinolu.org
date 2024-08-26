import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const noAuthGuard: CanActivateFn | CanActivateChildFn = () => {
  const router: Router = inject(Router);
  const isAuthenticated = true;

  return isAuthenticated ? of(router.parseUrl('')) : of(true);
};
