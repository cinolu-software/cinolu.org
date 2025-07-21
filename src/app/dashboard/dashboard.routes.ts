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
    loadChildren: () => enterprisesRoutes
  },
  {
    path: 'users',
    title: 'Les utilisateurs',
    loadComponent: () => import('./features/users/users.component').then((c) => c.DashboardUsersComponent)
  }
];
