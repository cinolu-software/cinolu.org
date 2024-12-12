import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/overview/overview.component').then((c) => c.OverviewComponent)
  }
];
