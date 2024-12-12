import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./feature/home/home.component').then((c) => c.HomeComponent)
  }
];
