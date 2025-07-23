import { Routes } from '@angular/router';

export const enterprisesRoutes: Routes = [
  {
    path: '',
    title: 'Mes entreprises',
    children: [
      {
        path: '',
        title: 'List',
        loadComponent: () => import('./list/enterprises.component').then((c) => c.UserEnterprisesComponent)
      },
      {
        path: 'add',
        title: 'Add ',
        loadComponent: () => import('./add/add-enterprise.component').then((c) => c.AddEnterpriseComponent)
      },
      {
        path: 'update/:slug',
        title: 'Update',
        loadComponent: () => import('./edit/edit-enterprise.component').then((c) => c.EditEnterpriseComponent)
      },
      {
        path: 'view/:slug',
        title: 'View',
        loadComponent: () => import('./view/view-enterprise.component').then((c) => c.ViewEnterpriseComponent)
      }
    ]
  }
];
