import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

export const authGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.user()) return true;

  // Construire le returnUrl à partir de la route courante
  const returnUrl = '/' + route.url.map((segment) => segment.path).join('/');

  router.navigate(['/sign-in'], { queryParams: { returnUrl } });
  return false;
};
