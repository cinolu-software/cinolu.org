import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () =>
      import('./pages/landing-page.component').then(
        (c) => c.LandingPageComponent,
      ),
  },
];
