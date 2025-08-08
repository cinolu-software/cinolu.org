import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: 'list',
    title: 'Les utilisateurs',
    children: [
      {
        path: '',
        title: 'Liste des utilisateurs',
        loadComponent: () =>
          import('./pages/users-list/users-list.component').then(
            (c) => c.UsersListComponent,
          ),
      },
      {
        path: 'edit/:email',
        title: "Modifier l'utilisateur",
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component').then(
            (c) => c.UserEditComponent,
          ),
      },
      {
        path: 'add',
        title: 'Ajouter un utilisateur',
        loadComponent: () =>
          import('./pages/user-add/user-add.component').then(
            (c) => c.AddUserComponent,
          ),
      },
    ],
  },
  {
    path: 'roles',
    title: 'Roles',
    loadComponent: () =>
      import('./pages/user-roles/user-roles.component').then(
        (c) => c.UserRolesComponent,
      ),
  },
];
