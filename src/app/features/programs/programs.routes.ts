import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Details du programmes',
    loadComponent: () => import('./pages/detail-programs/detail-programs').then((c) => c.DetailPrograms),
  },
  {
    path: ':slug/:slug',
    title: 'Events - Details',
    loadComponent: () => import('./pages/list-sub-programs/list-sub-programs').then((c) => c.ListSubPrograms),
  },
];
