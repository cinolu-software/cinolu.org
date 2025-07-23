import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: 'projects',
    title: 'Les projets',
    loadComponent: () => import('./pages/projects-list/projects-list.component').then((c) => c.ProjectsComponent)
  },
  {
    path: 'project-categories',
    title: 'Les catégories de projets',
    loadComponent: () =>
      import('./pages/project-categories/project-categories.component').then((c) => c.ProjectCategoriesComponent)
  }
];
