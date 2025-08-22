import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Liste des projets',
        loadComponent: () => import('./pages/projects').then((c) => c.Projects),
      },
      {
        path: 'add',
        title: 'Créer un projet',
        loadComponent: () =>
          import('./pages/add-project/add-project').then(
            (c) => c.AddProjectComponent,
          ),
      },
      {
        path: 'edit/:slug',
        title: 'Modifier un projet',
        loadComponent: () =>
          import('./pages/edit-project/edit-project').then(
            (c) => c.EditProjectComponent,
          ),
      },
    ],
  },
];
