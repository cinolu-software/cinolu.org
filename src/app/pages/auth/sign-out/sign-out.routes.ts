import { Routes } from '@angular/router';

export const signOutRoutes: Routes = [
  {
    path: 'sign-out',
    title: 'Sign out',
    loadComponent: () => import('./sign-out.component').then((c) => c.AuthSignOutComponent)
  }
];
