import { Routes } from '@angular/router';

export const joinUsRoutes: Routes = [
  {
    path: '',
    title: 'Rejoindre Cinolu',
    loadComponent: () => import('./pages/join-us.component').then((c) => c.JoinUsComponent)
  }
];
