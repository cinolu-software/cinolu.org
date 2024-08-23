import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('app/modules/dashboard/dashboard.component').then((c) => c.DashboardComponent)
  }
];
