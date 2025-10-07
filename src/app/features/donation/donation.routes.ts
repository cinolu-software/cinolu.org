import { Routes } from '@angular/router';

export const donationRoutes: Routes = [
  {
    path: '',
    title: 'Rejoindre Cinolu',
    loadComponent: () => import('./pages/donation').then((c) => c.Donation),
  },
];
