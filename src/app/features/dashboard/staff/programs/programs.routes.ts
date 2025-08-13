import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: '',
    title: 'Les programmes',
    loadComponent: () =>
      import('./pages/list-programs').then(
        (c) => c.ListPrograms,
      ),
  },
];
