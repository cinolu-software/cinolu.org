import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: '',
    title: 'Programs',
    loadComponent: () => import('./pages/list/list.component').then((c) => c.ListProgramsComponent)
  },
  {
    path: ':id',
    title: 'Programs - Details',
    loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsProgramsComponent)
  }
];
