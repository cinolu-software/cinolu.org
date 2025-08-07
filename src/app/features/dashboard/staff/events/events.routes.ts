import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: 'list',
    children: [
      {
        path: '',
        title: 'Liste des événements',
        loadComponent: () =>
          import('./pages/events-list/events-list.component').then(
            (c) => c.EventsListComponent
          ),
      },
      {
        path: 'add',
        title: 'Créer un événement',
        loadComponent: () =>
          import('./pages/event-add/event-add.component').then(
            (c) => c.AddEventComponent
          ),
      },
      {
        path: 'edit/:slug',
        title: 'Modifier un événement',
        loadComponent: () =>
          import('./pages/event-edit/event-edit.component').then(
            (c) => c.EditEventComponent
          ),
      },
    ],
  },
  {
    path: 'categories',
    title: "Catégories d'événements",
    loadComponent: () =>
      import('./pages/event-categories/event-categories.component').then(
        (c) => c.EventCategoriesComponent
      ),
  },
];
