import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: '',
    title: 'Les programmes',
    loadComponent: () => import('./pages/programs-list.component').then((c) => c.ProgramsListComponent)
  }
];
