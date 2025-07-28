import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    title: '',
    children: [
      {
        path: '',
        title: 'Projects List',
        loadComponent: () => import('./pages/projects-list/projects-list.component').then((c) => c.ProjectsComponent)
      },
      {
        path: 'add',
        title: 'Create Project',
        loadComponent: () => import('./pages/project-add/project-add.component').then((c) => c.ProjectAddComponent)
      }
    ]
  },
  {
    path: 'categories',
    title: 'Les catégories de projets',
    loadComponent: () =>
      import('./pages/project-categories/project-categories.component').then((c) => c.ProjectCategoriesComponent)
  }
];
