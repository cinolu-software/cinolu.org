import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const unauthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = inject(AuthStore).user();

  if (!user) return true;
  router.navigate(['/']);
  return false;
};
