import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Programmes - Details',
    loadComponent: () => import('./features/details/project.component').then((c) => c.ProjectComponent)
  },
  {
    path: '',
    title: 'Programmes',
    loadComponent: () => import('./features/list/projects.component').then((c) => c.ProjectsComponent)
  }
];
