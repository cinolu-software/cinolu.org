import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/info/info.component').then((c) => c.ProfileInfoComponent)
  },
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    children: [
      {
        path: '',
        title: 'List',
        loadComponent: () =>
          import('./feature/enterprises/list/enterprises.component').then((c) => c.ProfileEnterprisesComponent)
      },
      {
        path: 'add',
        title: 'Add ',
        loadComponent: () =>
          import('./feature/enterprises/add/add-enterprise.component').then((c) => c.AddEnterpriseComponent)
      },
      {
        path: 'update/:slug',
        title: 'Update',
        loadComponent: () =>
          import('./feature/enterprises/edit/edit-enterprise.component').then((c) => c.EditEnterpriseComponent)
      }
    ]
  }
];
