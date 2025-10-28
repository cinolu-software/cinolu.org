import { Routes } from '@angular/router';

export const galleryRoutes: Routes = [
  {
    path: '',
    title: 'Galerie',
    loadComponent: () => import('./pages/gallery').then((c) => c.Gallery),
  },
];
