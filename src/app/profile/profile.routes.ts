import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./features/overview/overview.component').then((c) => c.OverviewComponent)
  }
];
