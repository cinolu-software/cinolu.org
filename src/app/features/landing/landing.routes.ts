import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/landing').then((c) => c.Landing)
  }
];
