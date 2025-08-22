import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Liste des événements',
        loadComponent: () => import('./pages/events').then((c) => c.Events),
      },
      {
        path: 'add',
        title: 'Créer un événement',
        loadComponent: () =>
          import('./pages/add-event/add-event').then(
            (c) => c.AddEventComponent,
          ),
      },
      {
        path: 'edit/:slug',
        title: 'Modifier un événement',
        loadComponent: () =>
          import('./pages/edit-event/edit-event').then(
            (c) => c.EditEventComponent,
          ),
      },
    ],
  },
];
