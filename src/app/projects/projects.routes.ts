import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: ':id',
    title: 'Programmes - Details',
    loadComponent: () => import('./feature/details/project.component').then((c) => c.ProjectComponent)
  },
  {
    path: '',
    title: 'Programmes',
    loadComponent: () => import('./feature/list/projects.component').then((c) => c.ProjectsComponent)
  }
];
