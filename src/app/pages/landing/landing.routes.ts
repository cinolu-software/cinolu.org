import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    data: { breadcrumb: 'Accueil' },
    loadComponent: () => import('./landing.component').then((c) => c.LandingComponent)
  }
];
