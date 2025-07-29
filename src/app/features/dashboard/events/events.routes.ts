import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: 'list',
    title: '',
    children: [
      {
        path: '',
        title: 'Events List',
        loadComponent: () => import('./pages/events-list/events-list.component').then((c) => c.EventsListComponent)
      },
      {
        path: 'add',
        title: 'Create Event',
        loadComponent: () => import('./pages/event-add/event-add.component').then((c) => c.AddEventComponent)
      },
      {
        path: 'edit/:slug',
        title: 'Edit Event',
        loadComponent: () => import('./pages/event-edit/event-edit.component').then((c) => c.EditEventComponent)
      }
    ]
  },
  {
    path: 'categories',
    title: 'Event Categories',
    loadComponent: () =>
      import('./pages/event-categories/event-categories.component').then((c) => c.EventCategoriesComponent)
  }
];
