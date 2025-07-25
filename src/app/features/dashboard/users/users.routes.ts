import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Les utilisateurs',
    loadComponent: () => import('./pages/users-list/users-list.component').then((c) => c.UsersListComponent)
  },
  {
    path: 'edit/:email',
    title: "Modifier l'utilisateur",
    loadComponent: () => import('./pages/user-edit/user-edit.component').then((c) => c.UserEditComponent)
  },
  {
    path: 'add',
    title: 'Ajouter un utilisateur',
    loadComponent: () => import('./pages/user-add/user-add.component').then((c) => c.AddUserComponent)
  }
];
