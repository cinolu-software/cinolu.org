import { Routes } from '@angular/router';
import { enterprisesRoutes } from './feature/enterprises/enterprises.routes';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/user-info/user-info.component').then((c) => c.UserInfoComponent)
  },
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    children: enterprisesRoutes
  }
];
