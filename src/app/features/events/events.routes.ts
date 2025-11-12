import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Events',
    loadComponent: () => import('./pages/list-events/list-events').then((c) => c.ListEvents)
  },
  {
    path: ':slug',
    title: 'Events - Details',
    loadComponent: () => import('./pages/detail-event/detail-event').then((c) => c.DetailEvent)
  }
];
