import { Routes } from '@angular/router';

export const rolesRoutes: Routes = [
  {
    path: '',
    title: 'Les rôles',
    loadComponent: () => import('./pages/roles-list.component').then((c) => c.RolesListComponent)
  }
];
