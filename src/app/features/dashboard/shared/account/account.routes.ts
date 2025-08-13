import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    title: 'Mon compte',
    loadComponent: () =>
      import('./pages/account').then((c) => c.Account),
  },
];
