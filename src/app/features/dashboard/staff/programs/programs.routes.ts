import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: 'programs',
    title: 'Les programmes',
    loadComponent: () =>
      import('./pages/list-programs/list-programs').then((c) => c.ListPrograms),
  },
  {
    path: 'subprograms',
    title: 'Les sous-programmes',
    loadComponent: () =>
      import('./pages/list-subprograms/list-subprograms').then(
        (c) => c.ListSubprograms,
      ),
  },
  {
    path: 'program-categories',
    title: 'Les categories',
    loadComponent: () =>
      import('./pages/program-categories/program-categories').then(
        (c) => c.ProgramCategories,
      ),
  },
];
