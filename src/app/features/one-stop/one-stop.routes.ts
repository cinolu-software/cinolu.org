import { Routes } from '@angular/router';

export const oneStopRoutes: Routes = [
  {
    path: '',
    title: 'One Stop Shop',
    loadComponent: () => import('./pages/one-stop').then((c) => c.OneStop)
  }
];
