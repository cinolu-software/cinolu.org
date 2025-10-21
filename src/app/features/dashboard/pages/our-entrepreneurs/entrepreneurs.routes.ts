import { Routes } from '@angular/router';

export const entrepreneursRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Liste des entrepreneurs',
        loadComponent: () => import('./pages/list-entrepreneurs/list-entrepreneurs').then((c) => c.ListEntrepreneurs),
      },
      {
        path: 'edit/:email',
        title: "Modifier l'entrepreneur",
        loadComponent: () => import('./pages/edit-entrepreneur/edit-entrepreneur').then((c) => c.EditEntrepreneur),
      },
      {
        path: 'ventures',
        title: 'Liste des entreprises',
        loadComponent: () => import('./pages/list-ventures/list-ventures').then((c) => c.ListVentures),
      },
    ],
  },
];
