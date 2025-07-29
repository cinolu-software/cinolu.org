import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateFn } from '@angular/router';
import { RightsService } from '../auth/rights.service';
import { RoleEnum } from '../auth/role.enum';
import { AuthStore } from '../auth/auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const rightsService = inject(RightsService);

  const requiredRole = route.data['requiredRole'] as RoleEnum;
  const currentRoles = (authStore.user()?.roles as unknown as RoleEnum[]) || [];

  if (rightsService.isAuthorized({ currentRoles, requiredRole })) {
    return true;
  }
  router.navigate(['/dashboard']);
  return false;
};
