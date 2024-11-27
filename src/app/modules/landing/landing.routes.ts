import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./landing.component').then((c) => c.LandingComponent)
  }
];
