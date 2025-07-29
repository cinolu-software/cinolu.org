import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: 'list',
    title: '',
    children: [
      {
        path: '',
        title: 'Projects List',
        loadComponent: () =>
          import('./pages/projects-list/projects-list.component').then((c) => c.ProjectsListComponent)
      },
      {
        path: 'add',
        title: 'Create Project',
        loadComponent: () => import('./pages/project-add/project-add.component').then((c) => c.AddProjectComponent)
      },
      {
        path: 'edit/:slug',
        title: 'Edit Project',
        loadComponent: () => import('./pages/project-edit/project-edit.component').then((c) => c.EditProjectComponent)
      }
    ]
  },
  {
    path: 'categories',
    title: 'Project Categories',
    loadComponent: () =>
      import('./pages/project-categories/project-categories.component').then((c) => c.ProjectCategoriesComponent)
  }
];
