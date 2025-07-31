import { Routes } from '@angular/router';

export const venturesRoutes: Routes = [
  {
    path: '',
    title: 'Mes entreprises',
    children: [
      {
        path: '',
        title: 'Liste',
        loadComponent: () =>
          import('./pages/ventures-list/ventures-list.component').then((c) => c.VenturesListComponent)
      },
      {
        path: 'add',
        title: 'Ajouter',
        loadComponent: () => import('./pages/venture-add/venture-add.component').then((c) => c.AddVentureComponent)
      },
      {
        path: 'update/:slug',
        title: 'Modifier',
        loadComponent: () => import('./pages/venture-edit/venture-edit.component').then((c) => c.EditVentureComponent)
      },
      {
        path: 'view/:slug',
        title: 'Voir',
        loadComponent: () =>
          import('./pages/venture-detail/venture-detail.component').then((c) => c.VentureDetailComponent)
      }
    ]
  }
];
