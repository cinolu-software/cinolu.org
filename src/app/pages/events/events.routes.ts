import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Events',
    loadComponent: () => import('./pages/list/events.component').then((c) => c.EventsComponent)
  },
  {
    path: ':id',
    title: 'Events - Details',
    loadComponent: () => import('./pages/details/event.component').then((c) => c.EventComponent)
  }
];
