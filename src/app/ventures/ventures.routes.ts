import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const ventureRoutes: Routes = [
  {
    path: 'add',
    title: 'Ventures - Add',
    canActivate: [authGuard],
    loadComponent: () => import('./features/add/add-venture.component').then((c) => c.AddVentureComponent)
  },
  {
    path: ':id',
    title: 'Ventures - Detail',
    canActivate: [authGuard],
    loadComponent: () => import('./features/details/venture.component').then((c) => c.VentureComponent)
  }
];
