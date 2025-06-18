import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/info/info.component').then((c) => c.ProfileInfoComponent)
  }
];
