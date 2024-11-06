import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./pages/list/programs.component').then((c) => c.ProgramsComponent)
  },
  {
    path: ':id',
    title: 'Programs - Details',
    loadComponent: () => import('./pages/details/program.component').then((c) => c.ProgramComponent)
  }
];
