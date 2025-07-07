import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: 'products',
    title: 'Les produits',
    children: [
      {
        path: 'add',
        title: 'Add ',
        loadComponent: () => import('./add/add-product.component').then((c) => c.AddProductComponent)
      }
    ]
  }
];
