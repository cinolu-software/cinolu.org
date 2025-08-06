import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: 'list',
    title: '',
    children: [
      {
        path: '',
        title: 'Liste des projets',
        loadComponent: () =>
          import('./pages/projects-list/projects-list.component').then((c) => c.ProjectsListComponent)
      },
      {
        path: 'add',
        title: 'Créer un projet',
        loadComponent: () => import('./pages/project-add/project-add.component').then((c) => c.AddProjectComponent)
      },
      {
        path: 'edit/:slug',
        title: 'Modifier un projet',
        loadComponent: () => import('./pages/project-edit/project-edit.component').then((c) => c.EditProjectComponent)
      }
    ]
  },
  {
    path: 'categories',
    title: 'Catégories de projets',
    loadComponent: () =>
      import('./pages/project-categories/project-categories.component').then((c) => c.ProjectCategoriesComponent)
  }
];
