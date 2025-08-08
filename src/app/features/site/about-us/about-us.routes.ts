import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    title: 'About',
    loadComponent: () =>
      import('./pages/about-us.component').then((c) => c.AboutUsComponent),
  },
];
