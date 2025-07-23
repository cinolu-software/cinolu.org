import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./pages/account.component').then((c) => c.AccountComponent)
  }
];
