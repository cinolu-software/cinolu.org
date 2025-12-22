// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthStore } from '../auth/auth.store';

// export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
//   return () => {
//     const authStore = inject(AuthStore);
//     const router = inject(Router);
//     const user = authStore.user();

//     if (!user) {
//       router.navigate(['/sign-in']);
//       return false;
//     }

//     const userRoles = Array.isArray(user.roles) ? user.roles : [];
//     const hasRole = userRoles.some((role) => {
//       const roleName = typeof role === 'string' ? role : role.name;
//       return allowedRoles.includes(roleName);
//     });

//     if (!hasRole) {
//       router.navigate(['/']);
//       return false;
//     }

//     return true;
//   };
// };

// // export const userGuard: CanActivateFn = roleGuard(['user']);
// // export const adminGuard: CanActivateFn = roleGuard(['admin', 'staff']);
