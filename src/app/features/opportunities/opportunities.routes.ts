import { Routes } from '@angular/router';

export const opportunitiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list-opportunities/list-opportunities').then((m) => m.ListOpportunities)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/detail-opportunity/detail-opportunity').then((m) => m.DetailOpportunity)
  }
];
