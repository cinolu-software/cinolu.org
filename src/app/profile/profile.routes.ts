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
        title: 'Liste des entreprises',
        loadComponent: () =>
          import('./feature/enterprises/list/enterprises.component').then((c) => c.ProfileEnterprisesComponent)
      },
      {
        path: 'add',
        title: 'Add Enterprise',
        loadComponent: () =>
          import('./feature/enterprises/add/add-enterprise.component').then((c) => c.AddEnterpriseComponent)
      },
      {
        path: 'udate/:slug',
        title: 'Update Enterprise',
        loadComponent: () =>
          import('./feature/enterprises/update/update-enterprise.component').then((c) => c.UpdateEnterpriseComponent)
      }
    ]
  }
];
