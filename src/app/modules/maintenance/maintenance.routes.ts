import { Routes } from '@angular/router';

export const maintenanceRoutes: Routes = [
  {
    path: '',
    title: 'Coming soon',
    loadComponent: () => import('./maintenance.component').then((c) => c.MaintenanceComponent)
  }
];
