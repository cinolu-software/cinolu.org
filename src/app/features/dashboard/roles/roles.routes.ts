import { Routes } from '@angular/router';

export const rolesRoutes: Routes = [
  {
    path: 'roles',
    title: 'Les rôles',
    loadComponent: () => import('./pages/roles-list.component').then((c) => c.RolesListComponent)
  }
];
