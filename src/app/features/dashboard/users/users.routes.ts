import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Les utilisateurs',
    loadComponent: () => import('./pages/users-list.component').then((c) => c.UsersListComponent)
  }
];
