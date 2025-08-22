import { Routes } from '@angular/router';

export const subprogramsRoutes: Routes = [
  {
    path: '',
    title: 'Les programmes',
    loadComponent: () =>
      import('./pages/list-subprograms').then(
        (c) => c.ListSubprograms,
      ),
  },
];
