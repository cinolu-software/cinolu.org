import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: ':id',
    title: 'Programs - Details',
    loadComponent: () => import('./details/program.component').then((c) => c.ProgramComponent)
  },
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./list/programs.component').then((c) => c.ProgramsComponent)
  }
];
