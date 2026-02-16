import { Routes } from '@angular/router';

export const partnersRoutes: Routes = [
  {
    path: '',
    title: 'Partenaires',
    loadComponent: () => import('./pages/partners').then((c) => c.Partners)
  }
];
