import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Mes produits',
        loadComponent: () =>
          import('./pages/list-ventures/list-products').then(
            (c) => c.ListVentures,
          ),
      },
      {
        path: 'add',
        title: 'Ajouter un produit',
        loadComponent: () =>
          import('./pages/add-venture/add-venture').then((c) => c.AddVenture),
      },
    ],
  },
];
