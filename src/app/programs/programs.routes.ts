import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: ':id',
    title: 'Programs - Details',
    loadComponent: () => import('./feature/details/program.component').then((c) => c.ProgramComponent)
  },
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./feature/list/programs.component').then((c) => c.ProgramsComponent)
  }
];
