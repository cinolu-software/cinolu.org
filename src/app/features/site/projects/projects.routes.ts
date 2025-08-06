import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Program - Details',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then((c) => c.ProjectDetailComponent)
  },
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./pages/projects-list/projects-list.component').then((c) => c.ProjectsListComponent)
  }
];
