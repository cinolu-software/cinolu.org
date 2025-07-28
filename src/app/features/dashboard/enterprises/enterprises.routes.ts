import { Routes } from '@angular/router';

export const enterprisesRoutes: Routes = [
  {
    path: '',
    title: 'Mes entreprises',
    children: [
      {
        path: '',
        title: 'List',
        loadComponent: () =>
          import('./pages/enterprises-list/enterprises-list.component').then((c) => c.EnterprisesListComponent)
      },
      {
        path: 'add',
        title: 'Add ',
        loadComponent: () =>
          import('./pages/enterprise-add/enterprise-add.component').then((c) => c.EnterpriseAddComponent)
      },
      {
        path: 'update/:slug',
        title: 'Update',
        loadComponent: () =>
          import('./pages/enterprise-edit/enterprise-edit.component').then((c) => c.EnterpriseEditComponent)
      },
      {
        path: 'view/:slug',
        title: 'View',
        loadComponent: () =>
          import('./pages/enterprise-detail/enterprise-detail.component').then((c) => c.EnterpriseDetailComponent)
      }
    ]
  }
];
