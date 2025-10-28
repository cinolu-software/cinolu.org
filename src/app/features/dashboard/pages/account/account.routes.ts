import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    title: 'Mon compte',
    loadComponent: () => import('./pages/user-profil/user-profil').then((c) => c.UserProfil),
  },
];
