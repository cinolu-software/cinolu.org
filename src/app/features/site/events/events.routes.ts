import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Events',
    loadComponent: () =>
      import('./pages/events-list/events-list.component').then(
        (c) => c.EventsListComponent,
      ),
  },
  {
    path: ':slug',
    title: 'Events - Details',
    loadComponent: () =>
      import('./pages/event-detail/event-detail.component').then(
        (c) => c.EventDetailComponent,
      ),
  },
];
