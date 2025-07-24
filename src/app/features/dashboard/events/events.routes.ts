import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Les événements',
    loadComponent: () => import('./pages/events-list/events-list.component').then((c) => c.EventsComponent)
  },
  {
    path: 'categories',
    title: "Les catégories d'événements",
    loadComponent: () => import('./pages/event-categories/categories.component').then((c) => c.EventCategoriesComponent)
  }
];
