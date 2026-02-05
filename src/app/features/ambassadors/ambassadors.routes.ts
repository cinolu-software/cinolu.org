import { Routes } from '@angular/router';

export const ambassadorsRoutes: Routes = [
  {
    path: '',
    title: 'Ambassadeurs Cinolu',
    loadComponent: () => import('./pages/list-ambassadors/list-ambassadors').then((c) => c.ListAmbassadors)
  },
  {
    path: ':email',
    title: 'Détails Ambassadeur',
    loadComponent: () => import('./pages/detail-ambassador/detail-ambassador').then((c) => c.DetailAmbassador)
  }
];
