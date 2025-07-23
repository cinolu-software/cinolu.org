import { Routes } from '@angular/router';

export const enterprisesRoutes: Routes = [
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    children: [
      {
        path: '',
        title: 'List',
        loadComponent: () => import('./pages/list/enterprises.component').then((c) => c.UserEnterprisesComponent)
      },
      {
        path: 'add',
        title: 'Add ',
        loadComponent: () => import('./pages/add/add-enterprise.component').then((c) => c.AddEnterpriseComponent)
      },
      {
        path: 'update/:slug',
        title: 'Update',
        loadComponent: () => import('./pages/edit/edit-enterprise.component').then((c) => c.EditEnterpriseComponent)
      },
      {
        path: 'view/:slug',
        title: 'View',
        loadComponent: () => import('./pages/view/view-enterprise.component').then((c) => c.ViewEnterpriseComponent)
      }
    ]
  }
];
