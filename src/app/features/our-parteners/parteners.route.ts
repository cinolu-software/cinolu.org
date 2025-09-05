import { Routes } from '@angular/router';

export const OurParteners: Routes = [
  {
    path: '',
    title: 'Our-Parteners',
    loadComponent: () =>
      import('./pages/our-parteners').then((c) => c.OurParteners),
  },
];
