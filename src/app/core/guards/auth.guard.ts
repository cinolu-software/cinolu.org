import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

/** Route de login (deep-link : redirection avec returnUrl en query). */
const LOGIN_PATH = '/sign-in';

export const authGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.user()) return true;

  // state.url = URL demandée (ex. /dashboard/ventures/create) — fiable pendant la navigation
  const pathOnly = state.url.split('?')[0].trim() || '/';
  const returnUrl = pathOnly.startsWith('/') ? pathOnly : '/' + pathOnly;
  router.navigate([LOGIN_PATH], { queryParams: { returnUrl } });
  return false;
};
