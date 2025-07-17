import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Events',
    loadComponent: () => import('./features/list/events.component').then((c) => c.EventsComponent)
  },
  {
    path: ':slug',
    title: 'Events - Details',
    loadComponent: () => import('./features/details/event.component').then((c) => c.EventComponent)
  }
];
