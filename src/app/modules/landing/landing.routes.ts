import { Route } from '@angular/router';

export const landingRoutes: Route[] = [
  { path: '', title: 'Home', loadComponent: () => import('./landing.component').then((c) => c.LandingComponent) }
];
