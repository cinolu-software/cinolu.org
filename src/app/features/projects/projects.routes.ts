import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Program - Details',
    loadComponent: () => import('./pages/detail-project/detail-project').then((c) => c.DetailProject),
  },
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./pages/list-projects/list-projects').then((c) => c.ListProjects),
  },
];
