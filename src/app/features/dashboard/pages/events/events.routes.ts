import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: 'events',
    title: 'Les événements',
    loadComponent: () => import('./pages/events-list/events.component').then((c) => c.EventsComponent)
  },
  {
    path: 'event-categories',
    title: "Les catégories d'événements",
    loadComponent: () => import('./pages/event-categories/categories.component').then((c) => c.EventCategoriesComponent)
  }
];
