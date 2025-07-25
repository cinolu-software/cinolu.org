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
          import('./pages/enterprise-add/add-enterprise.component').then((c) => c.AddEnterpriseComponent)
      },
      {
        path: 'update/:slug',
        title: 'Update',
        loadComponent: () =>
          import('./pages/enterprise-edit/edit-enterprise.component').then((c) => c.EditEnterpriseComponent)
      },
      {
        path: 'view/:slug',
        title: 'View',
        loadComponent: () =>
          import('./pages/enterprise-view/view-enterprise.component').then((c) => c.ViewEnterpriseComponent)
      }
    ]
  }
];
