import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Events',
    loadComponent: () => import('./feature/list/events.component').then((c) => c.EventsComponent),
  },
  {
    path: ':slug',
    title: 'Events - Details',
    loadComponent: () => import('./feature/details/event.component').then((c) => c.EventComponent),
  },
];
