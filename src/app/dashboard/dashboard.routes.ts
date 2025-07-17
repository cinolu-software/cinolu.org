import { Routes } from '@angular/router';
import { enterprisesRoutes } from './features/enterprises/enterprises.routes';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./features/account/account.component').then((c) => c.AccountComponent)
  },
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    children: enterprisesRoutes
  }
];
