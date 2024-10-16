import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: 'programs',
    title: 'Programs',
    loadComponent: () => import('./programs.component').then((c) => c.ProgramsComponent)
  }
];
