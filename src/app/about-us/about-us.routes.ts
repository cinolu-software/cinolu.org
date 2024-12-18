import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    title: 'About',
    loadComponent: () => import('./feature/home/home.component').then((c) => c.HomeComponent)
  }
];
