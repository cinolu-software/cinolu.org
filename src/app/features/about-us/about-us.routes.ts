import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    title: 'About',
    loadComponent: () => import('./pages/about-us').then((c) => c.AboutUs)
  }
];
