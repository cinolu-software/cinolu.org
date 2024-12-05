import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () => import('./profile.component').then((c) => c.ProfileComponent)
  }
];
