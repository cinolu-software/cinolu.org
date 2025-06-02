import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/home/profile.component').then((c) => c.ProfileComponent)
  }
];
